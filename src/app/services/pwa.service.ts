import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material';
import { SwUpdate } from '@angular/service-worker';

@Injectable()
export class UpdateService {
    constructor(private swUpdate: SwUpdate, private snackbar: MatSnackBar) {
        this.swUpdate.available.subscribe(evt => {
            const snack = this.snackbar.open('Atualização disponivel', 'Carregar Atualização');
            snack
                .onAction()
                .subscribe(() => {
                    window.location.reload();
                    console.log('estou aqui no dismiss');

                    snack.dismiss()
                });
        })
    }
};