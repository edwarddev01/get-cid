import { Component, OnInit } from '@angular/core';
import { Itokens } from '../interfaces/token.interface';
import { AdminService } from '../services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '../services/loading.service';
@Component({
  selector: 'app-list-tokens',
  templateUrl: './list-tokens.component.html',
  styleUrl: './list-tokens.component.css',
})
export class ListTokensComponent implements OnInit {
  public tokens: Itokens[] = [];
  public tokensFilterd: Itokens[] = [];
  public page!: number;
  public total!: number;
  public searchText: string = '';
  Math = Math;
  constructor(
    private adminService: AdminService,
    private toast: ToastrService,
    private loading: LoadingService
  ) {}

  ngOnInit(): void {
    this.getTokens();
  }
  getTokens() {
    this.loading.show();
    this.adminService.getAllTokens().subscribe(
      (response) => {
        if (response) {
          this.tokens = response;
        }
        this.loading.hide();
        this.gettokensFiltered();
      },
      (error) => {
        console.log(`Error al obtener tokens: ${error}`);
        this.toast.error('No se pudo obtener los tokens', 'Error');
        this.loading.hide();
      }
    );
  }

  async copyToClipboard(copyText: string, text: string) {
    try {
      await navigator.clipboard.writeText(copyText);
      this.toast.success(`${text} copiado correctamente!`, 'Success');
    } catch (err) {
      console.error('Failed to copy: ', err);
      this.toast.error(`Error al copiar ${text}}!`, 'Error');
    }
  }

  gettokensFiltered(): void {
    this.tokensFilterd = [];
    this.tokensFilterd = this.tokens.filter((token) =>
      token.token.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
