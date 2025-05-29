import { Component, computed, inject, input, ViewEncapsulation } from '@angular/core';
import { Member } from '../../_models/member';
import { RouterLink } from '@angular/router';
import { LikesService } from '../../_services/likes.service';

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css'
})
export class MemberCardComponent {
  private LikesService = inject(LikesService);
  member = input.required<Member>();
  hasLiked = computed(() => this.LikesService.likeIds().includes(this.member().id));

  toogleLike(){
   this.LikesService.toogleLike(this.member().id).subscribe({
    next: () => {
      if(this.hasLiked()){
           this.LikesService.likeIds.update(ids => ids.filter(x => x !== this.member().id))
      }else{
        this.LikesService.likeIds.update( ids => [...ids,this.member().id])
      }
    }
   })
  }
}
