import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService, AccountResponse, CreateAccountRequest } from '../../api.service';

@Component({
  selector: 'app-owner-accounts',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './owner-accounts.html',
  styleUrl: './owner-accounts.css'
})
export class OwnerAccounts implements OnInit {
  accounts: AccountResponse[] = [];
  loading = true;
  errorText: string | null = null;

  // Create form
  showCreateForm = false;
  newEmail = '';
  newPassword = '';
  newFullName = '';
  newRole: 'STUDENT' | 'TEACHER' = 'STUDENT';
  creating = false;
  createSuccess: string | null = null;
  createError: string | null = null;

  // Delete
  deletingId: number | null = null;

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadAccounts();
  }

  loadAccounts() {
    this.loading = true;
    this.api.listAccounts().subscribe({
      next: (res) => {
        this.accounts = res;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorText = 'Failed to load accounts.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  toggleCreateForm() {
    this.showCreateForm = !this.showCreateForm;
    this.createSuccess = null;
    this.createError = null;
  }

  createAccount() {
    this.creating = true;
    this.createSuccess = null;
    this.createError = null;

    const body: CreateAccountRequest = {
      email: this.newEmail,
      password: this.newPassword,
      fullName: this.newFullName,
      role: this.newRole
    };

    this.api.createAccount(body).subscribe({
      next: (res) => {
        this.creating = false;
        this.createSuccess = `Account created: ${res.fullName} (${res.role})`;
        this.newEmail = '';
        this.newPassword = '';
        this.newFullName = '';
        this.newRole = 'STUDENT';
        this.loadAccounts();
      },
      error: (err) => {
        this.creating = false;
        if (err.status === 409) {
          this.createError = 'Email already exists.';
        } else if (err.error?.message) {
          this.createError = err.error.message;
        } else {
          this.createError = 'Failed to create account.';
        }
        this.cdr.detectChanges();
      }
    });
  }

  deleteAccount(id: number) {
    if (!confirm('Are you sure you want to delete this account?')) return;

    this.deletingId = id;
    this.api.deleteAccount(id).subscribe({
      next: () => {
        this.deletingId = null;
        this.loadAccounts();
      },
      error: (err) => {
        this.deletingId = null;
        alert(err.error?.message || 'Failed to delete account.');
        this.cdr.detectChanges();
      }
    });
  }

  roleClass(role: string): string {
    switch (role) {
      case 'OWNER': return 'role-owner';
      case 'TEACHER': return 'role-teacher';
      case 'STUDENT': return 'role-student';
      default: return '';
    }
  }
}

