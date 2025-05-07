import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { DepartmentEndpointRoleComponentService } from '../../../services/component/department-endpoint-role-component.service';
import { RoleEndpointComponentService } from '../../../services/component/role-endpoint-component.service';
import { DepartmentEndpointRole } from '../../../models/department/departmentEndpointRole';
import { Department } from '../../../models/department/department';
import { RoleEndpoint } from '../../../models/roleEndpoints/roleEndpoint';

declare var $: any;

@Component({
  selector: 'app-department-role-update',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,],
  templateUrl: './department-role-update.component.html',
  styleUrl: './department-role-update.component.css'
})
export class DepartmentRoleUpdateComponent {
  lang:ILanguage=Languages.lngs.get(localStorage.getItem("lng"))
  departmentRoleUpdateForm: FormGroup
  departmentRole:DepartmentEndpointRole
  departmentDetailsDto:Department
  departmentroleUpdate:string="POST.Updating.UpdateDepartmentRolesItem"
  selectedEndpointIds: string[] = [];
  roleEndpoints:RoleEndpoint[]
  roleData:boolean=false
  @Output() departmentEvent = new EventEmitter<any>();
  @Input() set departmentDetail(value:any){
    if (!value) {return}
    this.getByDepartmentRole(value.id);
  }
  constructor(
    private departmentEndpointRoleComponentService:DepartmentEndpointRoleComponentService,
    private formBuilder:FormBuilder,
    private roleEndpointComponentService:RoleEndpointComponentService
  ) { }
  async getByDepartmentRole(id: string) {
    this.departmentRole = await this.departmentEndpointRoleComponentService.getById(id)
    this.getEndPointSelect(this.departmentRole.roleEndpointId);
    this.getAllRole();
    this.updateDepartmentRoleForm(this.departmentRole);
  }
  updateDepartmentRoleForm(value: DepartmentEndpointRole) {
    this.departmentRoleUpdateForm = this.formBuilder.group({
      id: [value.id],
      departmentId: [value.departmentId],
      roleEndpointId: [value.roleEndpointId],
    })
  }
  updateDepartmentRole() {
    let selectedRoles = [];
    this.roleEndpoints.forEach(role => {
      let checkbox = document.getElementById(`flexCheckDefault${role.id}`) as HTMLInputElement;
      if (checkbox && checkbox.checked) {
        selectedRoles.push(role.id);
      }
    });
    this.departmentRole.roleEndpointId = selectedRoles;
    this.departmentEndpointRoleComponentService.updateDepartmentEndpointRole(this.departmentRole, () => {
      this.departmentEvent.emit();
      $('#updateDepartmentEndpointRoleModal').modal('hide');
      $('#departmentModal').modal('toggle')
    });
  }
  async getAllRole() {
     await this.roleEndpointComponentService.getAllDetails((response)=>{
      this.roleEndpoints =response;
      this.roleData=true;
     });
  }
  async getEndPointSelect(id: string[]) {
    try {
      const selectedData = await this.roleEndpointComponentService.getSelectedRoles(id);
      const data: RoleEndpoint[] = await selectedData.toPromise();
      for (const item of data) {
        this.selectedEndpointIds.push(item.id);
      }
    
    } catch (error) {
      this.selectedEndpointIds = [];
    }
  }
  isSelected(roleId: string): boolean {
    return this.selectedEndpointIds.includes(roleId);
  }

}
