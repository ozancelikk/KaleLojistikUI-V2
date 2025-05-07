import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Languages } from '../../../../assets/locales/language';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { HallwayComponentService } from '../../../services/component/hallway-component.service';
import { ToastrService } from 'ngx-toastr';
import { Floor } from '../../../models/floor/floor';
import { FloorComponentService } from '../../../services/component/floor-component.service';
import { Branch } from '../../../models/branch/branch';
import { Block } from '../../../models/block/block';
import { BlockComponentService } from '../../../services/component/block-component.service';
import { BranchComponentService } from '../../../services/component/branch-component.service';

declare var $: any;
@Component({
  selector: 'app-update-hallway',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,],
  templateUrl: './update-hallway.component.html',
  styleUrl: './update-hallway.component.css'
})
export class UpdateHallwayComponent {
  tasks: any[];
  updateHallwayRole:string="POST.Updating.UpdateHallwayItem";
  @Output() hallwayEvent = new EventEmitter<any>()
  @Output() hallwayGraficEvent = new EventEmitter<any>()
  @Input() set hallwayDetail(value: any) {
    if (!value) return
    this.updateHallwayForm(value)
  }
  dataLoaded = false;
  floors: Floor[];
  branchs: Branch[];
  blocks: Block[];

  protected hallwayUpdateForm: FormGroup
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  constructor(private hallwayComponentService: HallwayComponentService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private floorComponentService: FloorComponentService,
    private blockComponentService: BlockComponentService,
    private branchComponentService: BranchComponentService) { }

  ngOnInit(): void {
    this.getAllBranch();
    this.getAllFloor();
    this.getAllBlock();
  }

  updateHallwayForm(value: any) {
    this.hallwayUpdateForm = this.formBuilder.group({
      id: [value.id, Validators.required],
      branchId: [value.branchId, Validators.required],
      floorId: [value.floorId, Validators.required],
      blockId: [value.blockId, Validators.required],
      hallwayName: [value.hallwayName, Validators.required],
      status: [value.status, Validators.required],
      qrCodeAdress: [value.qrCodeAdress]
    })
  }

  updateHallway() {
    if (this.hallwayUpdateForm.valid) {
      const model = Object.assign({}, this.hallwayUpdateForm.value)
      if(model.hallwayName.trim() ==''){
        this.toastrService.error(this.lang.pleaseFillİnformation)
        return
      }
      this.hallwayComponentService.updateHallway(model, () => {
        this.hallwayEvent.emit(true)
        this.hallwayGraficEvent.emit(true)
        $('#updateModal').modal('hide')
      })
    } else {
      this.toastrService.info(this.lang.pleaseFillİnformation,this.lang.error)
    }
  }

  updateTask(index: number) {
    if (index >= 0 && index < this.tasks.length) {
      const updatedHallwayTasks = [...this.tasks];
      updatedHallwayTasks[index].status = false;
      const hallwayModel = {
        ...this.hallwayUpdateForm.value,
        tasks: updatedHallwayTasks,
      };
      this.hallwayComponentService.updateHallway(hallwayModel)
    }
  }

  updateHallwayTask() {
    if (this.hallwayUpdateForm.valid) {
      let hallwayModel = Object.assign({}, this.hallwayUpdateForm.value);
      let updatedHallwayTasks = [...hallwayModel.tasks];
      const taskNameInput = document.getElementById('taskName') as HTMLInputElement;
      const taskDescriptionTextarea = document.getElementById('taskDescription') as HTMLTextAreaElement;
      let currentDate = new Date();
      let formattedDate = currentDate.toISOString();
      let newTask = {
        taskName: taskNameInput.value, // taskName alanına değeri atar
        taskDescription: taskDescriptionTextarea.value,
        status: true,
        date: formattedDate
      };
      updatedHallwayTasks.push(newTask);
      hallwayModel.tasks = updatedHallwayTasks;
      this.hallwayComponentService.updateHallway(hallwayModel)
    } else {
      this.toastrService.error(this.lang.anErrorOccurredDuringTheUpdateProcess);
    }
  }

  async getAllFloor(successCallBack?: () => void) {
    this.floors = (await this.floorComponentService.getAllFloor())
    this.dataLoaded = true;
    if (successCallBack) {
      successCallBack();
    }
  }
  async getAllBlock(successCallBack?: () => void) {
    this.blocks = (await this.blockComponentService.getAllBlock())
    this.dataLoaded = true;
    if (successCallBack) {
      successCallBack();
    }
  }
  async getAllBranch(successCallBack?: () => void) {
    this.branchs = (await this.branchComponentService.getAllBranch())
    this.dataLoaded = true;
    if (successCallBack) {
      successCallBack();
    }
  }


}
