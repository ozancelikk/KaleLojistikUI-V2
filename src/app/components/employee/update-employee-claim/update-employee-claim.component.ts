import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeDto } from '../../../models/employee/employeeDto';
import { RoleEndpoint } from '../../../models/roleEndpoints/roleEndpoint';
import { EmployeeEndpointRoleComponentService } from '../../../services/component/employee-endpoint-role-component.service';
import { RoleEndpointComponentService } from '../../../services/component/role-endpoint-component.service';
import { EmployeeEndpointRole } from '../../../models/employee/employeeEndpointRole';

@Component({
  selector: 'app-update-employee-claim',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './update-employee-claim.component.html',
  styleUrl: './update-employee-claim.component.css'
})
export class UpdateEmployeeClaimComponent {
  lang:ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  protected employeeRoleUpdateForm: FormGroup
  employeeRole:EmployeeEndpointRole
  employeeDetailsDto:EmployeeDto
  selectedEndpointIds: string[] = [];
  roleEndpoints:RoleEndpoint[]
  roleData:boolean=false  
  @Output() employeeEndpointRoleEmitter =new EventEmitter<any>();
  @Input() set employeeClaimDetail(value: any) {
    if (!value) return
    this.getByEmployeeRole(value.id)
   
  }
 

  constructor( private employeeEndpointRoleComponentService:EmployeeEndpointRoleComponentService, private formBuilder:FormBuilder, private roleEndpointComponentService:RoleEndpointComponentService) {}

    async getByEmployeeRole(id: string) {
      this.employeeRole =await this.employeeEndpointRoleComponentService.getByEndpointEmployeeId(id)
      this.getEndPointSelect(this.employeeRole.roleEndpointId);
      this.getAllRole();
      this.updateEmployeeRoleForm(this.employeeRole);
     
    }

    
  updateEmployeeRoleForm(value: EmployeeEndpointRole) {
    this.employeeRoleUpdateForm = this.formBuilder.group({
      id: [value.id, Validators.required],
      employeeId: [value.employeeId, Validators.required],
      roleEndpointId: [value.roleEndpointId, Validators.required],
    })
  }

  updateEmployeeRole() {
    let selectedRoles = [];
    this.roleEndpoints.forEach(role => {
      let checkbox = document.getElementById(`flexCheckDefault${role.id}`) as HTMLInputElement;
      if (checkbox && checkbox.checked) {
        selectedRoles.push(role.id);
      }
    });
    const model = Object.assign({}, this.employeeRoleUpdateForm.value);
    model.roleEndpointId = selectedRoles;

  
    this.employeeEndpointRoleComponentService.updateEmployeeEndpointRole(model, () => {
      this.employeeEndpointRoleEmitter.emit(true)
      this.employeeRoleUpdateForm.reset()
    })
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
  async getAllRole(){
      await this.roleEndpointComponentService.getAllDetails((response)=>{
        this.roleEndpoints =response
        this.roleData=true
    });
  }
  
  isSelected(roleId: string): boolean {
    return this.selectedEndpointIds.includes(roleId);
  }

}
