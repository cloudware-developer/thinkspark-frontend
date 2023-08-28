import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contato } from '../models/Contato';
import { PessoaService } from '../services/pessoa.service';

@Component({
  selector: 'app-modal-adicionar',
  templateUrl: './modal-adicionar.component.html',
  styleUrls: ['./modal-adicionar.component.css']
})
export class ModalAdicionarComponent {

  contato: Contato = new Contato();

  form = this.formBuilder.group({
    contatoId: [null],
    pessoaId: [this.data.pessoaId],
    tipoContatoId: [null],
    descricao: [null],
  })

  constructor(
    private formBuilder: FormBuilder,
    private pessoaService: PessoaService,
    private dialogRef: MatDialogRef<ModalAdicionarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  submit() {
    this.contato.contatoId = this.form.controls['contatoId'].value ?? 0;
    this.contato.pessoaId = this.form.controls['pessoaId'].value ?? 0;
    this.contato.tipoContatoId = this.form.controls['tipoContatoId'].value ?? 0;
    this.contato.descricao = this.form.controls['descricao'].value ?? "";
    this.pessoaService.adicionaContato(this.contato)
      .subscribe({
        next: (data) => {
          alert('Contato adicionado com sucesso!')
          this.onClose();
        },
        error: (error) => {
          console.log(JSON.stringify(error))
          alert('Erro ao adicionar contato!')
        },
        complete: () => {
          console.log('Fim')
        }
      });
  }

  apagarContatos(pessoaId: number): void {
    this.pessoaService.apagarContatos(pessoaId)
      .subscribe({
        next: (data) => {
          alert('Contatos apagados com sucesso!')
          this.onClose();
        },
        error: (error) => {
          console.log(JSON.stringify(error))
          alert(`Erro ao apagar contatos da pessoa: ${pessoaId}!`)
        },
        complete: () => {
          console.log('Fim')
        }
      });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
