import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/database';



@Injectable({ providedIn: 'root' })
export class CleanerService {
    artigo: ArtigosAntigosInterface[] = [];
    constructor(
        private http: HttpClient,
        private db: AngularFireDatabase) {
        console.log('qwlogbhupfewsda');
        // this.getJson();
    }



    async getJson() {
        this.artigo = await this.http.get<ArtigosAntigosInterface[]>('./assets/artigos.json').toPromise();
        this.formatTextoProperty();
    }


    private cleanJson(text) {
        const start = text.indexOf('<img src=');
        const final = text.indexOf('>');
        const result = text.substring(start, final + 1);
        const retorno = text.replace(result, '');
        return retorno;
    }

    private takeImage(text, key) {
        console.log('--------------------------------------');
        console.log('INICIO DE NOVO CICLO');
        console.log('NUMERO DO CICLO: ' + key)
        console.log('Log da linha 39 de postion',
            text.indexOf('<img src='));
        console.log('Log da linha 40 de postion',
            text.indexOf('>'));

        const startTag = text.indexOf('<img src=');
        const finalTag = text.indexOf('>');
        if (startTag >= 0) {
            const result = text.substring(startTag, finalTag + 1);
            console.log(result);
            const startIMG = result.indexOf('"');
            const finalIMG = result.indexOf('>');
            const resultIMG = result.substring(startIMG + 1, finalIMG - 1);
            console.log('O que deveria retornar de ' + key, resultIMG);
            console.log('FIM DO CICLO');
            console.log('--------------------------------------');
            return resultIMG;
        } else {

            console.log('FIM DO CICLO. NÃO POSSUI IMAGEM');
            console.log('--------------------------------------');
            return 'https://via.placeholder.com/150';
        }
    }

    private formatTextoProperty() {
        /* console.clear(); */
        let cleanerArtigo = null;
        this.artigo.forEach((element, key) => {
            element.imageLink = this.takeImage(element.Texto, element.IdArtigo);
            element.Texto = this.cleanJson(element.Texto);
            const randomID = Math.random().toString(36).substr(2, 9);
            console.log('idArtigo ', randomID);
            cleanerArtigo = {
                titulo: element.Titulo,
                subTitulo: element.SubTitulo,
                idArtigo: randomID,
                texto: element.Texto,
                autor: element.Autor,
                data: element.Data,
                imageLink: element.imageLink,
                urlOriginal: element.URLoriginal,
                comentario: element.Comentario,
                sugestaoComentario: element.SugestaoComentario,
                atualizadoPor: element.AtualizadoPor,
                dataHoraAtualizacao: element.DataHoraAtualizacao
            };
            this.sendToFirebase(cleanerArtigo);
        });
    }
    private async sendToFirebase(ev?) {
        console.log('ATIVANDO O ENVIO!', ev);

        const remove = await this.db.list('/artigo').remove();
        const renew = await this.db.list('/artigo').set(ev.idArtigo, ev);
        // this.testLenght();
    }

    private testLenght() {
        this.db.list('/artigo').valueChanges()
            .subscribe((res) => {
                console.log('Data', res[0]);
                console.log('lenght', res.length);
            });
    }
}


interface ArtigosAntigosInterface {
    IdArtigo: string;
    Titulo: string;
    SubTitulo: string;
    TextoPrevio: string;
    Texto: string;
    imageLink?: string;
    TextoIntegral: string;
    LinkDireto: string;
    Autor: string;
    Data?: string;
    MostrarData: string;
    DataAtualizacao?: string;
    MostrarDataAtualizacao: string;
    Evento: string;
    URLoriginal: string;
    URLsite: string;
    URLinterna: string;
    ImagemPreviewFB?: string;
    VideoPreviewFB?: string;
    SugestaoComentario: string;
    Comentario: string;
    Ordenacao?: string;
    ComentarioAtivo: string;
    Publicado: string;
    AtualizadoPor?: string;
    DataHoraAtualizacao: string;
    Excluido: string;
}
