import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Languages } from '../../../../assets/locales/language';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { FloorComponentService } from '../../../services/component/floor-component.service';
import { Branch } from '../../../models/branch/branch';
import { BranchComponentService } from '../../../services/component/branch-component.service';
import { BlockComponentService } from '../../../services/component/block-component.service';
import { Block } from '../../../models/block/block';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-floor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-floor.component.html',
  styleUrl: './add-floor.component.css'
})
export class AddFloorComponent {
  @Output() floorEvent = new EventEmitter<any>()
  @Output() floorCountEvent = new EventEmitter<any>()
  protected floorAddForm: FormGroup
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));

  branchs: Branch[];
  blocks: Block[];
  constructor(private floorComponentService: FloorComponentService, private formBuilder: FormBuilder, private branchComponentService: BranchComponentService, private blockComponentService: BlockComponentService, private toastrService: ToastrService) {
    this.createNewFloorForm()
  }

  ngOnInit(): void {
    this.getAllBranch();
    this.getAllBlocks();
  }

  createNewFloorForm() {
    this.floorAddForm = this.formBuilder.group({
      branchId: ["", Validators.required],
      blockId: ["", Validators.required],
      floorName: ["", Validators.required],
    })
  }


  addFloor() {
    if (!this.floorAddForm.valid) {
      this.toastrService.info(this.lang.pleaseFillİnformation, this.lang.error)
      return

    }
    const model = Object.assign({}, this.floorAddForm.value)
    if (model.floorName.trim() == '') {
      this.toastrService.error(this.lang.pleaseFillİnformation)
      return
    }
    this.floorComponentService.addfloor(model, () => {
      this.floorEvent.emit(true)
      this.floorCountEvent.emit(true)
      this.createNewFloorForm()
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
