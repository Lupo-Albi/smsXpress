import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = 
{
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "/api";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  // Função para tratamento de erros
  private handleError (error: HttpErrorResponse)
  {
    if (error.error instanceof ErrorEvent)
    {
      // Tratamento de um erro no lado do cliente ou um erro da rede.
      console.error('Ocorreu um erro: ', error.error.message);
    } else
    {
      // O lado do servidor retornou um código de resposta que não teve sucesso
      // O corpo da resposta pode conter informações do que pode ter dado errado.
      console.error(
        `Código retornado pelo backend ${error.status}, ` +
        `corpo do erro: ${error.error}`
      );
    }

    // Retorna um observável com uma mensagem de erro voltada para o usuário
    return throwError('Algo ruim aconteceu :( Por favor, tente novamente depois.');
  }

  // Função para extrair os dados de resposta
  private extrairDados(res: Response)
  {
    let body = res;
    return body || { };
  }

  // Funções de Criar e Ler um registro de SMS
  postSMS(data): Observable<any>
  {
    return this.http.post(apiUrl, data, httpOptions)
      .pipe(
        catchError(this.handleError));
  }

  getSMS(protocolo: string): Observable<any>
  {
    const url = `${apiUrl}/${protocolo}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extrairDados),
      catchError(this.handleError));
  }
}
