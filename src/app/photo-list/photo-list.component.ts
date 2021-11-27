import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { ScrollingService } from '../shared/scrolling.service';
export interface list {
  id: number;
  added?: boolean
}
@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {
  compareData = [];
  public endLimit: number = 10;
  public photos: any = [];

  constructor(private _data: DataService, private _scrollingService: ScrollingService) { }

  ngOnInit(): void {

    this.getAlbumData(this.endLimit); //for the first time

    this._scrollingService.getObservable().subscribe(status => {
      if (status) {
        this.endLimit = this.endLimit + 10; //addition of preview limit and new limit
        this.getAlbumData(this.endLimit);

      }
    });

  }


  getAlbumData(endLimit: number) {
    this._data.getPhotos(endLimit).subscribe(response => {

      this.photos = []; //data set as null for duplicate entry
      this.photos = this.photos.concat(response); // added new data

      // coampare two aaray for btn remove/comapre
      this.photos.forEach((ele)=>{
        this.compareData.forEach(element => {
          if(ele.id == element.id){
            ele.added = true;
          }
        });     
      })

      let clear = setInterval(() => { //target data in UI
        let target = document.querySelector(`#target${endLimit}`);
        if (target) {
          console.log("element found")
          clearInterval(clear);
          this._scrollingService.setObserver().observe(target);
        }
      }, 2000)
    },
      err => {
        console.log(err);
      })
  }

  // add data in camparision table
  compare(data:list) {
    const check = this.compareData.find(({ id }) => id === data.id);
    if (check !== data) {
      const check1 = this.compareData.find(({ id }) => id === data.id);
      if (check1?.id !== data.id) {
        this.compareData.unshift(data);
      } else {
        alert('Image already added in comparision table');
      }
    }
    else {
      alert('Image already added in comparision table');
    }
    data.added = true;
  }
  remove(data:list) {
    var index = this.compareData.findIndex(function (ele) {
      return ele.id === data.id;
    })
    if (index !== -1) this.compareData.splice(index, 1);
    data.added = false;
  }


}
