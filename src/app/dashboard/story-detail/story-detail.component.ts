import { Component, OnDestroy, OnInit } from '@angular/core';
import { Story } from '../../shared/models/story.model';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { ComponentCommunicationService } from '../../shared/services/component-communication.service';

@Component({
  selector: 'app-story-detail',
  templateUrl: './story-detail.component.html'
})
export class StoryDetailComponent implements OnInit, OnDestroy {

  story: Story = new Story();
  editing: boolean;
  storyDetailForm: FormGroup;
  subscription: Subscription;

  constructor(private route: ActivatedRoute,
              private componentCommunicationService: ComponentCommunicationService,
              private fb: FormBuilder) {
    this.editing = false;
    this.story = new Story();
  }

  ngOnInit() {
    this.route.params.subscribe(params => this.story.id = +params['id']);
    this.subscription = this.componentCommunicationService.getData().subscribe(data => this.story = data);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private initForm() {
    this.storyDetailForm = this.fb.group({
      title: [this.story.title],
      description: [this.story.description],
      latitude: [this.story.latitude],
      longitude: [this.story.longitude],
      startDate: [this.story.startDate]
    });
  }
}
