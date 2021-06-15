import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ResumesService} from '@app/_services';
import {Resume} from '@app/_models';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-resume-view',
  templateUrl: './resume-view.component.html',
  styleUrls: ['./resume-view.component.scss']
})
export class ResumeViewComponent implements OnInit {
  isLoading = true;
  resume: Resume;

  constructor(private route: ActivatedRoute, private resumeService: ResumesService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.resumeService.getById(params.id).subscribe((result: Resume) => {
        this.resume = result;
        this.isLoading = false;
      });
    });
  }

  public openPDF(): void {
    let position = 0;
    const DATA = document.getElementById('resume');
    html2canvas(DATA).then(canvas => {
      const fileWidth = 450;
      const pageHeight = 590;
      const fileHeight = canvas.height * fileWidth / canvas.width;
      let heightLeft = fileHeight;
      const FILEURI = canvas.toDataURL('image/png');
      const PDF = new jsPDF('p', 'px', [fileWidth, pageHeight]);

      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      heightLeft -= pageHeight;
      while (heightLeft >= 0) {
        position = heightLeft - fileHeight;
        PDF.addPage();
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
        heightLeft -= pageHeight;
      }

      PDF.save(`${this.resume.extra.getFIO()}pdf`);
    });
  }

}
