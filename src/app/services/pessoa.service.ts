import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pessoa } from '../models/Pessoa';
import { Contato } from '../models/Contato';
import { Paginacao } from '../models/Paginacao';

@Injectable({
    providedIn: 'root'
})
export class PessoaService {

    private baseUrl = 'http://localhost:5099/api'

    constructor(private http: HttpClient) { }

    public obtemPessoas(paginacao: Paginacao<Pessoa>): Observable<Paginacao<Pessoa>> {
        let params = new HttpParams()
        params = params.set('currentPage', paginacao.currentPage)
        params = params.set('itemsPerPage', paginacao.itemsPerPage)
        if (paginacao.orderByColumn != null)
            params = params.set('orderByColumn', paginacao.orderByColumn)
        if (paginacao.orderByDirection != null)
            params = params.set('orderByDirection', paginacao.orderByDirection)
        const endpoint = `${this.baseUrl}/pessoa/paginacao?${params.toString()}` 
        console.log(endpoint)
        return this.http.get<Paginacao<Pessoa>>(endpoint)
    }

    public obtemContatos(paginacao: Paginacao<Contato>, pessoaId: number): Observable<Paginacao<Contato>> {
        let params = new HttpParams()
        params = params.set('pessoaId', pessoaId)
        params = params.set('currentPage', paginacao.currentPage)
        params = params.set('itemsPerPage', paginacao.itemsPerPage)
        if (paginacao.orderByColumn != null)
            params = params.set('orderByColumn', paginacao.orderByColumn)
        if (paginacao.orderByDirection != null)
            params = params.set('orderByDirection', paginacao.orderByDirection)
        const endpoint = `${this.baseUrl}/contato/paginacao?${params.toString()}` 
        return this.http.get<Paginacao<Contato>>(endpoint);
    }

    public adicionaContato(model: Contato) {
        const endpoint = `${this.baseUrl}/contato`;
        return this.http.post(endpoint, model);
    }

    public adicionaPessoa(model: Pessoa) {
        const endpoint = `${this.baseUrl}/pessoa`;
        return this.http.post(endpoint, model);
    }

    public atualizaPessoa(model: Pessoa) {
        const endpoint = `${this.baseUrl}/pessoa`;
        return this.http.put(endpoint, model);
    }

    public apagarContatos(pessoaId: number) {
        const endpoint = `${this.baseUrl}/contato/${pessoaId}`;
        console.log(JSON.stringify(endpoint))
        return this.http.delete(endpoint);
    }

    public obtemCabecalho(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'text/plain',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTION'
        });
    }
}