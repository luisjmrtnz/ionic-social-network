import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()

export class UtilService {
    constructor(private toastCtrl: ToastController){}
    
    getToast(message, msgClass) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            showCloseButton: true,
            closeButtonText: 'Ok',
            dismissOnPageChange: true,
            cssClass: msgClass,
        });
        
        return toast;
    }
}