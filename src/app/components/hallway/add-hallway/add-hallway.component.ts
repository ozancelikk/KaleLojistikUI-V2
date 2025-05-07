import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { HallwayComponentService } from '../../../services/component/hallway-component.service';
import { BranchComponentService } from '../../../services/component/branch-component.service';
import { Branch } from '../../../models/branch/branch';
import { BlockComponentService } from '../../../services/component/block-component.service';
import { FloorComponentService } from '../../../services/component/floor-component.service';
import { Floor } from '../../../models/floor/floor';
import { Block } from '../../../models/block/block';
import { Employee } from '../../../models/employee/employee';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-add-hallway',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AddHallwayComponent],
  templateUrl: './add-hallway.component.html',
  styleUrl: './add-hallway.component.css'
})
export class AddHallwayComponent {
  @Output() hallwayEvent = new EventEmitter<any>()
  @Output() hallwayCountEvent = new EventEmitter<any>()
  protected hallwayAddForm: FormGroup
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  selectedTask: any

  branchs: Branch[];
  blocks: Block[];
  floors: Floor[];
  employee: Employee[];

  constructor(private hallwayComponentService: HallwayComponentService,
    private formBuilder: FormBuilder,
    private branchComponentService: BranchComponentService,
    private blockComponentService: BlockComponentService,
    private floorComponentservice: FloorComponentService,
    private toastrService: ToastrService
  ) {
    this.createNewHallwayForm()
  }

  ngOnInit(): void {
    this.getAllBranch();

  }

  createNewHallwayForm() {
    this.hallwayAddForm = this.formBuilder.group({
      branchId: ['', Validators.required],
      floorId: ['', Validators.required],
      blockId: ['', Validators.required],
      hallwayName: ['', Validators.required],
      status: [false],
      qrCodeAdress: [""]
    })
  }

  //#region GetDutyStations 

  async getAllBranch(successCallBack?: () => void) {
    this.branchs = (await this.branchComponentService.getAllBranch())
    if (successCallBack) {
      successCallBack();
    }
  }
  async onBranchChange(event: any) {
    const branchId = event.target.value;
    this.blocks = (await this.blockComponentService.getAllByBranchId(branchId))
    this.floors = []; // Katları boşalt
  }
  async onBlockChange(event: any) {
    const blockId = event.target.value;
    this.floors = (await this.floorComponentservice.getAllByBlockId(blockId))
  }

  //#endregion


  addHallway() {
    if (this.hallwayAddForm.valid) {
      const model = Object.assign({}, this.hallwayAddForm.value)
      if(model.hallwayName.trim() ==''){
        this.toastrService.error(this.lang.pleaseFillİnformation)
        return
      }
      this.hallwayComponentService.addHallway(model, () => {
        this.hallwayEvent.emit(true)
        this.hallwayCountEvent.emit(true)
        this.createNewHallwayForm()
        $('#hallwayAddModal').modal('hide')
      })
    } else {
      this.toastrService.info(this.lang.pleaseFillİnformation, this.lang.error)
    }
  }

}
