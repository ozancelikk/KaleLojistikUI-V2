import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AmeleService } from '../../services/common/amele.service';
import { Amele } from '../../models/amele/amele';

@Component({
  selector: 'app-amele',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './amele.component.html',
  styleUrls: ['./amele.component.css']
})
export class AmeleComponent implements OnInit {
  ameleForm!: FormGroup;
  ameleler: Amele[] = [];
  selectedAmele?: Amele;
  warehouseName: string = '';
  ameleIdForWarehouse: string = '';
  ameleDepoAdlari: { [key: string]: string } = {};

  constructor(private fb: FormBuilder, private ameleService: AmeleService) {}

  ngOnInit(): void {
    this.initForm();
    this.getAllAmele();
  }

  initForm(): void {
    this.ameleForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      warehouseId: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  getAllAmele() {
    this.ameleService.getAll().subscribe({
      next: res => {
        this.ameleler = res.data;
  
        for (let amele of this.ameleler) {
          this.ameleService.getWarehouse(amele.id).subscribe({
            next: w => this.ameleDepoAdlari[amele.id] = w.data.name,
            error: err => console.error("Depo alınamadı:", err)
          });
          
          
        }
      },
      error: err => console.error("Amele alınamadı", err)
    });
  }

  addAmele(): void {
    if (this.ameleForm.invalid) return;

    const newAmele: Amele = {
      ...this.ameleForm.value,
      id: ''
    };

    this.ameleService.add(newAmele).subscribe({
      next: () => {
        alert('Amele eklendi!');
        this.ameleForm.reset();
        this.getAllAmele();
      },
      error: err => console.error('Amele eklenemedi:', err)
    });
  }

  deleteAmele(id: string): void {
    this.ameleService.delete(id).subscribe({
      next: () => {
        alert('Amele silindi!');
        this.getAllAmele();
      },
      error: err => console.error('Silinemedi:', err)
    });
  }

  selectAmele(amele: Amele): void {
    this.selectedAmele = { ...amele };
  }

  updateAmele(): void {
    if (!this.selectedAmele) return;
  
    this.ameleService.update(this.selectedAmele.id, this.selectedAmele).subscribe({
      next: () => {
        alert('Amele güncellendi!');
        this.selectedAmele = undefined;
        this.getAllAmele();
      },
      error: err => console.error('Güncellenemedi:', err)
    });
  }
  

  getWarehouseName(): void {
    if (!this.ameleIdForWarehouse.trim()) return;

    this.ameleService.getWarehouseByEmployeeId(this.ameleIdForWarehouse).subscribe({
      next: res => this.warehouseName = res.data.name,
      error: err => console.error('Depo alınamadı:', err)
    });
  }
}
