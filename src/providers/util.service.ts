import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from 'ionic-angular';

@Injectable()

export class UtilService {
    loader;
    
    constructor(
        private toastCtrl: ToastController,
        private loadingCtrl: LoadingController){}
    
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
    
    initLoader() {
        this.loader = this.loadingCtrl.create({
          content: 'Please wait...',
          dismissOnPageChange: true
        });
    }
    
    presentLoader() {
        this.loader.present().catch(() => "Present Error");
    }
    
    dismissLoader() {
        this.loader.dismiss().catch(() => "Dismiss Error");
    }
}