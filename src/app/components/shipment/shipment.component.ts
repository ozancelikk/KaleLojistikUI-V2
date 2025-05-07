import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShipmentService } from '../../services/common/shipment.service';
import { ShipmentWithStatus } from '../../models/shipment/shipmentWithStatus';
import { WarehouseService } from '../../services/common/warehouse.service';


@Component({
  selector: 'app-shipment',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.css']
})
export class ShipmentComponent implements OnInit {
  shipmentForm!: FormGroup;
  
  shipments: ShipmentWithStatus[] = [];
  selectedShipment?: ShipmentWithStatus;
  statusInput: string = '';
  trackingNumberToDelete: string = '';
  shipmentIdForEmployee: string = '';
  assignedEmployee: any;
  hesaplamaAgirlik = 0;
  hesaplamaTip = '';
  hesaplananUcret: number | null = null;
  warehouseList: any[] = [];

  yeniGondericiEkle: boolean = false;
  gondericiForm!: FormGroup;
  gondericiler: any[] = []; 
  selectedSenderId: string = ''; 

  createdTrackingNumber: string = '';


  deliveredShipments: ShipmentWithStatus[] = [];
  constructor(private fb: FormBuilder, private shipmentService: ShipmentService,   private warehouseService: WarehouseService ) {}

  ngOnInit(): void {
    this.initForm();
    this.getAllShipments();
    this.getWarehouses();
    this.getAllGondericiler();
  }

  initForm(): void {
    this.shipmentForm = this.fb.group({
      senderId: ['', Validators.required],
      receiverName: ['', Validators.required],
      receiverPhone: ['', Validators.required],
      receiverEmail: ['', Validators.required],
      weight: [0, Validators.required],
      shipmentType: ['', Validators.required],
      deliveryAddress: ['', Validators.required],
      warehouseId: ['', Validators.required]
    });
    this.gondericiForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
    
  }
  initSenderForm(): void {
    this.gondericiForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  // addShipment(): void {
  //   if (this.shipmentForm.invalid) return;

  //   const newShipment = this.shipmentForm.value;
  //   this.shipmentService.addShipment(newShipment).subscribe({
  //     next: () => {
  //       alert("Kargo eklendi!");
  //       this.shipmentForm.reset();
  //       this.getAllShipments();
  //     },
  //     error: (err) => console.error('Kargo eklenemedi:', err)
  //   });
  // }

  addShipment(): void {

    //if (this.shipmentForm.invalid) return;
  
    const shipment = this.shipmentForm.value;
  
    if (!this.yeniGondericiEkle) {

      shipment.senderId = this.selectedSenderId;
    }
  
    const dto = {
      shipment: shipment,
      sender: this.yeniGondericiEkle ? {
        ...this.gondericiForm.value,
        id: this.generateObjectId()
      } : null
    };
    console.log("DTO:", dto);

    this.shipmentService.addShipment(dto).subscribe({
      next: () => {
        alert("Kargo oluşturuldu!");
        this.shipmentForm.reset();
        this.getAllShipments();
      },
      error: err => console.error("Kargo oluşturulamadı:", err)
    });
  }
  
 
  generateObjectId(): string {
    const timestamp = Math.floor(new Date().getTime() / 1000).toString(16);
    const random = 'xxxxxxxxxxxxxxxx'.replace(/x/g, () =>
      Math.floor(Math.random() * 16).toString(16)
    );
    return timestamp + random;
  }
  

  getAllShipments(): void {
    this.shipmentService.getAll().subscribe({
      next: res => this.shipments = res.data,
      error: err => console.error("Kargolar alınamadı:", err)
    });
  }
  

  getShipmentByTrackingNumber(trackingNumber: string): void {
    this.shipmentService.getByTrackingNumber(trackingNumber).subscribe({
      next: (res) => this.selectedShipment = res.data,
      error: (err) => console.error('Kargo alınamadı:', err)
    });
  }

  confirmSelectedShipmentDelivery(): void {
    if (!this.selectedShipment) return;
  
    this.shipmentService
      .confirmDelivery(this.selectedShipment.trackingNumber)
      .subscribe({
        next: () => {
          alert('Kargo teslim edildi olarak işaretlendi!');
          this.getAllShipments();
        },
        error: (err) => console.error('Teslimat onaylanamadı:', err)
      });
  }
  updateShipmentStatus(): void {
    if (!this.selectedShipment || !this.statusInput.trim()) return;
  
    this.shipmentService.updateStatus(this.selectedShipment.id, this.statusInput).subscribe({
      next: () => {
        alert("Durum güncellendi!");
        this.statusInput = '';
        this.getShipmentByTrackingNumber(this.selectedShipment.trackingNumber);
      },
      error: (err) => console.error('Durum güncellenemedi:', err)
    });
  }
  deleteSelectedShipment(): void {
    if (!this.selectedShipment) return;
  
    const confirmDelete = confirm('Bu kargoyu silmek istediğine emin misin?');
    if (!confirmDelete) return;
  
    this.shipmentService.deleteShipment(this.selectedShipment.id).subscribe({
      next: () => {
        alert('Kargo silindi.');
        this.selectedShipment = undefined;
        this.getAllShipments();
      },
      error: (err) => console.error('Kargo silinemedi:', err)
    });
  }
  
  deleteByTrackingNumber(): void {
    if (!this.trackingNumberToDelete?.trim()) return;
  
    const confirmDelete = confirm(`Kargoyu silmek istediğine emin misin? Takip No: ${this.trackingNumberToDelete}`);
    if (!confirmDelete) return;
  
    this.shipmentService.deleteByTrackingNumber(this.trackingNumberToDelete).subscribe({
      next: () => {
        alert('Kargo silindi!');
        this.trackingNumberToDelete = '';
        this.getAllShipments(); 
      },
      error: (err) => console.error('Silme başarısız:', err)
    });
  }


getAssignedEmployeeByInput(): void {
  if (!this.shipmentIdForEmployee.trim()) return;

  this.shipmentService.getAssignedEmployee(this.shipmentIdForEmployee).subscribe({
    next: (res) => this.assignedEmployee = res.data,
    error: (err) => console.error('Çalışan bilgisi alınamadı:', err)
  });
}


updateShipment(): void {
  if (!this.selectedShipment) return;

  this.shipmentService.updateShipment(this.selectedShipment.id, this.selectedShipment).subscribe({
    next: () => {
      alert('Kargo başarıyla güncellendi!');
      this.getAllShipments();
    },
    error: (err) => console.error('Güncelleme başarısız:', err)
  });
}


kargoUcretiHesapla(): void {
  this.shipmentService.calculatePrice(this.hesaplamaAgirlik, this.hesaplamaTip).subscribe({
    next: res => this.hesaplananUcret = res.price,
    error: err => console.error("Ücret hesaplanamadı:", err)
  });
}
getWarehouses() {
  this.warehouseService.getAll().subscribe({
    next: res => this.warehouseList = res.data,
    error: err => console.error("Depolar alınamadı:", err)
  });
}
getAllGondericiler(): void {
  this.shipmentService.getAllSenders().subscribe({
    next: res => this.gondericiler = res.data,
    error: err => console.error('Göndericiler alınamadı:', err)
  });
}

getDeliveredShipments(): void {
  this.shipmentService.getDeliveredShipments().subscribe({
    next: (res) => this.deliveredShipments = res.data,
    error: (err) => console.error("Teslim edilmiş kargolar alınamadı:", err)
  });
}



  
}
