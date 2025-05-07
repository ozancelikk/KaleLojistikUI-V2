import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynamicReportComponentService } from '../../../services/component/dynamic-report-component.service';
import { ToastrService } from 'ngx-toastr';
import { BranchComponentService } from '../../../services/component/branch-component.service';
import { BlockComponentService } from '../../../services/component/block-component.service';
import { FloorComponentService } from '../../../services/component/floor-component.service';
import { HallwayComponentService } from '../../../services/component/hallway-component.service';
import { RoomComponentService } from '../../../services/component/room-component.service';
declare var $:any

@Component({
  selector: 'app-add-dynamic-report-area',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './add-dynamic-report-area.component.html',
  styleUrl: './add-dynamic-report-area.component.css'
})
export class AddDynamicReportAreaComponent {
  lang:ILanguage=Languages.lngs.get(localStorage.getItem("lng"))
  @Output() dynamicReportAreaEmit=new EventEmitter<any>()
  dynamicReportAreaForm:FormGroup
  getAll:any[]
  list:string[]=[]
  userId:string
  empId:string
  getName:DynamicReportArea[]=[]
  report:boolean=false
  type:string

  constructor(
    private dynamicReportComponentService:DynamicReportComponentService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private branchComponentService:BranchComponentService,
    private blockComponentService:BlockComponentService,
    private floorComponentService:FloorComponentService,
    private hallwayComponentService:HallwayComponentService,
    private roomComponentService:RoomComponentService,
    ) {}

  ngOnInit(){
    this.createNewDynamicReportAreaForm()
    this.getList()
    this.userId=localStorage.getItem("userId")
    this.empId=localStorage.getItem("employeeId")
  }

  createNewDynamicReportAreaForm(){
    this.dynamicReportAreaForm=this.formBuilder.group({
      reportFilterDate:["",Validators.required],
      reportFilterEndDate:["",Validators.required],
      reportName:["",Validators.required],
      personId:[""],
      titleName:["",Validators.required],
      entityType:["",Validators.required],
      reportCreatedDate:[""],
      reportPath:[""],
    })
  }

  addDynamicReport(){
    this.report=true
    if(this.dynamicReportAreaForm.valid){
      let model=Object.assign({},this.dynamicReportAreaForm.value)
      if(model.reportName.trim() ==''||model.titleName.trim() ==''){
        this.toastrService.error(this.lang.pleaseFillİnformation)
        return
      }
      if (!this.userId) {
        model.personId=this.empId
      }
      model.personId=this.userId
      this.dynamicReportComponentService.dynamicReportAreaAdd(model,this.type,()=>{
        this.report=false
        this.dynamicReportAreaEmit.emit(true)
        this.createNewDynamicReportAreaForm()
        $("#addDynamicAreaReportModal").modal("hide")
      })
    }else{
      this.toastrService.error(this.lang.pleaseFillİnformation,this.lang.error)
    }
  }
  onChange(event: any) {
    const entityType = event.target.value
    switch (entityType) {
      case "Branch":
        this.getAllBranch()
        break;
      case "Block":
        this.getAllBlock()
        break;
      case "Floor":
        this.getAllFloor()
        break;
      case "Hallway":
        this.getAllHallway()
        break;
      case "Room":
        this.getAllRoom()
        break;
      default:
        break;
    }
  }
  changeArea(event:any){
    this.type=event.target.value
  }

  //#region  Get Methods
  getList(){
    this.list.push("Branch","Block","Floor","Hallway","Room")
  }
  async getAllBranch(){
    this.getName=[]
    this.getAll=await this.branchComponentService.getAllBranch()
    this.getAll.forEach(element => {
      this.getName.push({id:element.id,name:element.branchName})
    });
  }
  async getAllBlock(){
    this.getName=[]
    this.getAll=await this.blockComponentService.getAllBlock()
    this.getAll.forEach(element => {
      this.getName.push({id:element.id,name:element.blockName})
    });
  }
  async getAllFloor(){
    this.getName=[]
    this.getAll=await this.floorComponentService.getAllFloor()
    this.getAll.forEach(element => {
      this.getName.push({id:element.id,name:element.floorName})
    });
  }
  async getAllHallway(){
    this.getName=[]
    this.getAll=await this.hallwayComponentService.getAllHallway()
    this.getAll.forEach(element => {
      this.getName.push({id:element.id,name:element.hallwayName})
    });
  }
  async getAllRoom(){
    this.getName=[]
    this.getAll=await (await this.roomComponentService.getAllRoom()).data
    this.getAll.forEach(element => {
      this.getName.push({id:element.id,name:element.roomName})
    });
  }

  //#endregion

}
export interface DynamicReportArea {
  id:string
  name:string
}
