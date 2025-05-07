import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Languages } from '../../../../assets/locales/language';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { FloorComponentService } from '../../../services/component/floor-component.service';
import { CommonModule } from '@angular/common';
import { Branch } from '../../../models/branch/branch';
import { Block } from '../../../models/block/block';
import { BranchComponentService } from '../../../services/component/branch-component.service';
import { BlockComponentService } from '../../../services/component/block-component.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-update-floor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,],
  templateUrl: './update-floor.component.html',
  styleUrl: './update-floor.component.css'
})
export class UpdateFloorComponent {
  updateFloorRole:string="POST.Updating.UpdateFloorItem"
  @Output() floorEvent = new EventEmitter<any>()
  @Output() floorCountEvent = new EventEmitter<any>()
  @Input() set floorDetail(value: any) {
    if (!value) return
    this.updateFloorForm(value)
  }
  ngOnInit() {
    this.getAllBranch();
    this.getAllBlocks();
  }

  branchs: Branch[];
  blocks: Block[];
  floorUpdateLoad = false;

  protected floorUpdateForm: FormGroup
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  constructor(private floorComponentService: FloorComponentService,
    private formBuilder: FormBuilder,
    private branchComponentService: BranchComponentService,
    private blockComponentService: BlockComponentService,
    private toastrService: ToastrService) { }

  updateFloorForm(value: any) {
    this.floorUpdateForm = this.formBuilder.group({
      id: [value.id, Validators.required],
      blockId: [value.blockId, Validators.required],
      branchId: [value.branchId, Validators.required],
      floorName: [value.floorName, Validators.required],
    })
  }

  updateFloor() {
    if (!this.floorUpdateForm.valid) {
      this.toastrService.info(this.lang.pleaseFillİnformation, this.lang.error)
      return
    }
    const model = Object.assign({}, this.floorUpdateForm.value)
    if (model.floorName.trim() == '') {
      this.toastrService.error(this.lang.pleaseFillİnformation)
      return
    }
    this.floorComponentService.updateFloor(model, () => {
      this.floorUpdateLoad = true;
      this.floorEvent.emit(true)
      this.floorCountEvent.emit(true)
    })
  }
  async getAllBranch(successCallBack?: () => void) {
    this.branchs = (await this.branchComponentService.getAllBranch())
    if (successCallBack) {
      successCallBack();
    }
  }
  async getAllBlocks(successCallBack?: () => void) {
    this.blocks = (await this.blockComponentService.getAllBlock())
    if (successCallBack) {
      successCallBack();
    }
  }
  async onBranchChange(event: any) {
    const branchId = event.target.value
    this.blocks = (await this.blockComponentService.getAllByBranchId(branchId))
  }
}
