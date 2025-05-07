import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { DutyCommentComponentService } from '../../../services/component/duty-comment-component.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LanguageComponentService } from '../../../services/component/language-component.service';
import TechnicalErrorComponentService from '../../../services/component/technical-error-component.service';
import { ToastrService } from 'ngx-toastr';
import { DepartmentComponentService } from '../../../services/component/department-component.service';
import { Department } from '../../../models/department/department';

@Component({
  selector: 'app-add-duty-comment',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,RouterModule],
  templateUrl: './add-duty-comment.component.html',
  styleUrl: './add-duty-comment.component.css'
})
export class AddDutyCommentComponent {
  lang:ILanguage=Languages.lngs.get(localStorage.getItem("lng"))
  currentForm: string = '';
  dutyCommentForm:FormGroup;
  technicalErrorForm:FormGroup;
  id:any;
  dutyRate:number
  departments:Department[];
  constructor(private departmentComponentService:DepartmentComponentService,private dutyCommentComponentService:DutyCommentComponentService,private formBuilder:FormBuilder,private route: ActivatedRoute,private languageComponentService:LanguageComponentService,private technicalErrorComponentService:TechnicalErrorComponentService,private toastrService:ToastrService) { 
    this.id = this.route.snapshot.paramMap.get('id');
  }
  ngOnInit(){
    this.createNewTechnicalError();
    this.createNewDutyComment()
    this.startLanguage()
    this.getAllDepartment()
  }

  createNewDutyComment(){
    this.dutyCommentForm=this.formBuilder.group({
      name:["",Validators.required],
      surname:["",Validators.required],
      email:["",Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)],
      content:["",Validators.required],
      dutyRate:[""],
      roomId:[""],
    })
  }
  createNewTechnicalError(){
    this.technicalErrorForm=this.formBuilder.group({
      errorTitle:["",Validators.required],
      errorDescription:["",Validators.required],
      roomId:[""],
      employeeId:["",Validators.required],
    })
  }
  addMethods(){
    if(this.currentForm=="dutyComment"){
      this.addDutyComment()
    }else{
      this.addTechnicalError()
    }
  }
  addTechnicalError(){
    if(this.technicalErrorForm.valid){
      let model=Object.assign({},this.technicalErrorForm.value)
      model.roomId=this.id
      this.technicalErrorComponentService.addTechnicalErrorCustomer(model,()=>{
        this.createNewTechnicalError()
      })
    }else{
      this.toastrService.info(this.lang.pleaseFillİnformation)
    }
  }
  addDutyComment(){
    if(this.dutyCommentForm.valid){
      let model=Object.assign({},this.dutyCommentForm.value)
      model.roomId=this.id
      model.dutyRate=this.dutyRate
      this.dutyCommentComponentService.updateDutyComment(model,()=>{
        this.createNewDutyComment()
        if (model.dutyRate>=3) {
          window.location.href = "https://www.google.com/search?q=Kasev%20Huzurevi%20Yorumlar&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxI2NTM3NDcysDQ0NTQxszQ3NDQz2sDI-IpR3DuxOLVMwaO0qrQotSxTITK_qDQ3J7FoESsuGQAUCdGDTgAAAA&rldimm=5671720915146971162&tbm=lcl&cs=1&hl=tr&sa=X&ved=0CBMQ9fQKKABqFwoTCKDJtabwvYoDFQAAAAAdAAAAABAG&biw=1920&bih=945&dpr=1#lkt=LocalPoiReviews";
        } 
      })
    }
  }
  startLanguage() {
    var languControl = localStorage.getItem("lng")
    if (languControl == null) {
      this.changeLanguage("tr");
    }
  }
  changeLanguage(language: string) {
    localStorage.setItem("lng", language)
    this.languageComponentService.setLanguage(language)
    window.location.reload()
  }
  getRate(element: number) {
    this.dutyRate= element;
    console.log(this.dutyRate);
    
    return this.dutyRate;
  }
  showForm(formName: string) {
    this.currentForm = formName;
  }
  
  async getAllDepartment(){
    this.departments=await this.departmentComponentService.getAllDepartmentNoAuthorize()
  }

}
