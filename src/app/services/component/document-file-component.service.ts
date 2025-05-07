import { Injectable } from '@angular/core';
import { DocumentFileService } from '../common/document-file.service';
import { firstValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { DocumentFile } from '../../models/documentfile/documentFile';

@Injectable({
  providedIn: 'root'
})
export class DocumentFileComponentService {

  constructor(private documentFileService: DocumentFileService, private toastrService: ToastrService) { }

  async getAllDocuments() {
    const observable = this.documentFileService.getAllDocuments()
    return (await firstValueFrom(observable)).data
  }
  async getAllDocumentDetails() {
    const observable = this.documentFileService.getAllDocumentDetails()
    return (await firstValueFrom(observable)).data
  }

  async downloadDocument(documentId: string,documentName:string,callBackfunction?:()=>void) {
    const blob = await firstValueFrom(this.documentFileService.downloadDocument(documentId));
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.download = `${documentName}.pdf`;
    anchor.href = url;
    anchor.click();
    window.URL.revokeObjectURL(url);
  }
  async deleteDocument(id: string, callBackfunction?: () => void) {
    const observable = await this.documentFileService.deleteDocument(id)
    const promiseData = firstValueFrom(observable)
    promiseData.then(response => {
      this.toastrService.success(response.message)
      callBackfunction && callBackfunction()
    }).catch(error => {
      this.toastrService.error(error.error)
    })
  }
  async uploadFile(documentFile:DocumentFile,callBackfunction?: () => void) {
    const formData = new FormData();
    formData.append('personId', documentFile.personId);
    formData.append('documentName', documentFile.documentName);
    formData.append('departmentId', documentFile.departmentId);
    formData.append('File', documentFile.documentPath, documentFile.documentPath.name);
    const observable = await this.documentFileService.uploadFile(formData)
    const promiseData = firstValueFrom(observable)
    promiseData.then(response => {
      this.toastrService.success(response.message)
      callBackfunction && callBackfunction()
    })
  }
}
