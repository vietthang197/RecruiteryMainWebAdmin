import {
  Directive,
  ElementRef,
  Injectable,
  Input, OnChanges,
  OnInit,
  Renderer2, SimpleChanges,
  TemplateRef,
  ViewContainerRef
} from "@angular/core";
import {AuthorizationData} from "../guard/authorization.data";
import {Observable} from "rxjs";

@Directive({
  selector: '[has-permission]'
})
export class PermissionDirective implements OnInit, OnChanges{
  @Input() audience: string = ''
  @Input() resourceName: string = '';
  @Input() resourceScope: string[] = [];
  @Input() authorizations: AuthorizationData[] = [] ;

  constructor(private elementRef: ElementRef, private render: Renderer2) {}

  ngOnInit() {
  }

  doCheck() {
    // Thực hiện kiểm tra quyền hạn và xử lý hiển thị tại đây
    if (!this.audience || !this.resourceName || !this.resourceScope) {
      this.render.setStyle(this.elementRef.nativeElement, 'display', 'block');
    } else {
      let hasPerm = false;
      for (let item of this.authorizations) {
        if (item.audience == this.audience && item.permission.id == this.resourceName) {
          hasPerm = this.resourceScope?.every(element => item.permission.scopes?.includes(element))
          break;
        }
      }
      if (hasPerm) {
        this.render.setStyle(this.elementRef.nativeElement, 'display', 'block');
      } else {
        this.render.setStyle(this.elementRef.nativeElement, 'display', 'none');
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.doCheck()
  }
}
