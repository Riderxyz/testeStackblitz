import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions } from 'sweetalert2';
@Injectable()
export class ToastService {
    constructor() { }

    showToast(config: SweetAlertOptions) {

        /* title: 'Tem certeza',
            text: "Não será possivel reverter esta ação",
            icon: 'warning',
            showCancelButton: true,
            toast:true,
            position: 'top-right',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, delete-os!' */
        Swal.fire(config);
    }

    showConfirmDialog(
        config: SweetAlertOptions,
    ) {
        return Swal.fire(config)
    }

    showToastSucess(title, subtitle?) {
        if (subtitle === undefined) {
            subtitle = null;
        }
        Swal.fire({
            title: title + '!',
            text: subtitle,
            icon: 'success',
            customClass: {
                title: 'onSucessToast',
                content: 'onSucessToast'
            },
            timerProgressBar: true,
            timer: 3000,
            showConfirmButton: false,
            showCancelButton: false,
            background: 'linear-gradient(315deg, #7ee8fa 0%, #80ff72 74%)',
            toast: true,

            //  timer: 3000,
            position: 'top-right',
        })
    }
    showToastError(title, subtitle?) {
        if (subtitle === undefined) {
            subtitle = null;
        }
        Swal.fire({
            title: title + '.',
            text: subtitle,
            icon: 'error',
            timer: 3000,
            timerProgressBar: true,
            customClass: {
                title: 'onErrorToast',
                content: 'onErrorToast'
            },
            background: 'linear-gradient(to left, #ff0095, #ff0000)',
            /*             showCancelButton: true, */
            toast: true,
            //  timer: 3000,
            position: 'top-right',
        })
    }
}
