import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import {NgbDate, NgbCalendar, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { CdQuizService } from 'src/app/services/backend/cd-quiz.service';
import * as moment from 'moment'
@Component({
  selector: 'app-cd-quiz',
  templateUrl: './cd-quiz.component.html',
  styleUrls: ['./cd-quiz.component.css']
})
export class CdQuizComponent implements OnInit {
  isDisable = false;
  constructor( 
    private route: ActivatedRoute,
    private quizService:CdQuizService,
    public formatter: NgbDateParserFormatter
  ) { 
   
  }
   

  quizs:Array<any>=[];
  cateForm:string="";
  page = 1;
  count = 0;
  tableSize = 8;
  tableSizes = [this.tableSize, 10 ,12,14,16,18,20 ];
  numberRegEx =  /[0-9\+\-\ ]/;
  formValueQuiz:FormGroup = new FormGroup({
    id:new FormControl(null),
    name:new FormControl('', Validators.required ),
    subject_id:new FormControl(this.getIdSubject(),Validators.required),
    duration_minutes:new FormControl('',[Validators.required,Validators.pattern('^-?[0-9]*$')]),
    start_time:new FormControl('', Validators.required ),
    end_time:new FormControl('', Validators.required),
    is_shuffle:new FormControl('0',Validators.required),
  });

  ngOnInit(): void {
    // console.log(this.getIdSubject());
    this.getListQuiz()
    
  }



  getListQuiz(){
    this.quizService.subjectQuizList(this.getIdSubject()).subscribe(
      {
        next:(res)=>{
          this.quizs = res;   
        },
        error:(err)=>{
          console.log(err);
        }
      }
    )
    
  }
  create(){
    this.cateForm = 'add'
  }
  store(){

    let data = {...this.formValueQuiz.value};
    // if(this.formValueQuiz.invalid) {
    //   alert("Invalid");
    //   return;
    // }

    this.quizService.create(data).subscribe((res:any)=>{
      this.getListQuiz()
      this.resetForm()
      Swal.fire({
        icon: 'success',
        title: 'Thêm thành công !',
        showConfirmButton: true,
        timer: 1500
      })
    })
  }
  edit(data:any){
    this.cateForm = 'edit'
    this.quizService.findId(data.id).subscribe({
      next:(res)=>{
        this.formValueQuiz.setValue({
          id:res.id,
          name:res.name,
          subject_id:res.subject_id,
          duration_minutes:res.duration_minutes,
          start_time:moment(res.start_time).format('YYYY-MM-DDThh:mm'),
          end_time:moment(res.end_time).format('YYYY-MM-DDThh:mm'),
          is_shuffle:res.is_shuffle,
        });
      },
      error:(err)=>{
        console.log(err);     
      },
    });
  }
  update(){
    // console.log(this.formValueQuiz.value.id);
    
    this.quizService.findId(this.formValueQuiz.value.id).subscribe({
      next:(res)=>{
        this.quizService.update(this.formValueQuiz.value, res.id ).subscribe((res:any)=>{
          this.resetForm();
          this.getListQuiz();
          Swal.fire({
            icon: 'success',
            title: 'Cập nhập thành công !',
            showConfirmButton: true,
            timer: 1500
          })
        })
      },
      error:(err)=>{
        console.log(err);
      }
    })

    
  }


  shuffle(id:any,data :any){
    Swal.fire({
      title: 'Bạn có chắc muốn thay đổi ?',
      // text: 'Bạn sẽ không thể khôi phục tệp này !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'CHUẨN !',
      cancelButtonText: 'Thôi , tao đổi ý !'
    }).then((result) => {
      if (result.value) {
        
        this.quizService.findId(id).subscribe({
          next:(res)=>{
            this.quizService.updateShuffle( id ,{data:data}).subscribe((res:any)=>{
              this.getListQuiz();
              // Swal.fire({
              //   icon: 'success',
              //   title: 'Cập nhập thành công !',
              //   showConfirmButton: true,
              //   timer: 1500
              // })
            })
          },
          error:(err)=>{
            console.log(err);
          }
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Đã hủy',
          'Vẫn chưa có gì thay đổi nha :)',
          'error'
        )
      }
    })
  }
  destroy(subject_id:any){ 
    Swal.fire({
      title: 'Bạn có chắc muốn loại bỏ ?',
      text: 'Bạn sẽ không thể khôi phục tệp này !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'CHUẨN !',
      cancelButtonText: 'Thôi , tao đổi ý !'
    }).then((result) => {
      if (result.value) {
        this.quizService.delete(subject_id).subscribe((res :any)  =>{
          console.log(res);
          this.getListQuiz()
          Swal.fire(
            'Xóa !',
            'Đã xóa thành công !',
            'success'
          )
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Đã hủy',
          'Tệp vẫn còn nha :)',
          'error'
        )
      }
    })
  }
  resetForm(){
    // this.formValueQuiz = new FormGroup({
    //   id:new FormControl(),
    //   name:new FormControl(),
    //   subject_id:new FormControl(this.getIdSubject()),
    //   duration_minutes:new FormControl(),
    //   start_time:new FormControl(),
    //   end_time:new FormControl(),
    //   is_shuffle:new FormControl('0'),
    // });
    this.formValueQuiz.reset();
  }
  getIdSubject(){
    return this.route.snapshot.paramMap.get('id_subject');
  }
  titleFormAdd(){
    this.cateForm = 'add'
  }

  onTableDataChange(event:any){
    this.page = event;
    this.getListQuiz();
  }  
  onTableSizeChange(event:any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getListQuiz();
  }  
}
