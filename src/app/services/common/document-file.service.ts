import { Injectable } from '@angular/core';
import { TtdHttpClientService } from '../ttdHttpClient/ttd-http-client.service';
import { SingleResponseModel } from '../../models/singleResponseModel';
import { DocumentFile } from '../../models/documentfile/documentFile';
import { ListResponseModel } from '../../models/listResponseModel';
import { ResponseModel } from '../../models/responseModel';
import { Observable } from 'rxjs';
import { DocumentFileDetailsDto } from '../../models/documentfile/documentfileDetailsDto';

@Injectable({
  providedIn: 'root'
})
export class DocumentFileService extends TtdHttpClientService{

  private _controller = "DocumentFileUpload"

  getAllDocuments() {
    return this.get<ListResponseModel<DocumentFile>>({ controller: this._controller, action: "GetAll" })
  }
  getAllDocumentDetails(){
    return this.get<ListResponseModel<DocumentFileDetailsDto>>({controller:this._controller,action:"GetAllDocumentDetails"})
  }

  downloadDocument(id: string): Observable<Blob> {
    const observable=this.get<Blob>({controller:this._controller,action:"DownloadDocument/"+`${id}`,responseType:'blob'})
    return observable
  }


  deleteDocument(id: string) {
    return this.get<ResponseModel>({ controller: this._controller, action: "Delete",queryString:`id=${id}`})
  }
  async uploadFile(documentFile:any){
    const observable=this.post<ResponseModel | DocumentFile>({controller:this._controller,action:"Add"},documentFile) as Observable<ResponseModel>
    return observable
  }
}
