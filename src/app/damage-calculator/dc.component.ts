import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { MessageService, ConfirmationService } from "primeng/api";

@Component({
  selector: "rc-damage-calculator",
  templateUrl: "./dc.component.html",
})
export class DamageCalculatorComponent implements OnInit {
  firstForm: FormGroup;
  secondForm: FormGroup;
  msgsFirst: any = [];
  msgsSecond: any = [];

  isHit: boolean = false;
  private isCritic: boolean = false;

  isBlocked: boolean = false;

  private critic: number = 90;

  success1Url: string;
  defeat1Url: string;
  success2Url: string;
  defeat2Url: string;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.constructFirstForm();
    this.constructSecondForm();
    this.initImages();
  }

  ngOnInit() {}

  reset() {
    this.confirmationService.confirm({
      message: "Are you sure that you want to reset the form?",
      accept: () => {
        this.isHit = false;
        this.isCritic = false;

        this.firstForm.controls.attackerDice.setValue(0);
        this.firstForm.controls.accuracity.setValue(0);
        this.firstForm.controls.defenderDice.setValue(0);
        this.firstForm.controls.velocity.setValue(0);

        this.secondForm.controls.attackerDice.setValue(0);
        this.secondForm.controls.damage.setValue(0);
        this.secondForm.controls.defenderDice.setValue(0);
        this.secondForm.controls.defense.setValue(0);

        this.firstForm.markAsPristine();
        this.firstForm.markAsUntouched();

        this.msgsFirst = [];
        this.msgsSecond = [];
      },
    });
  }

  calculateFirst() {
    this.msgsFirst = [];
    this.msgsSecond = [];
    this.isHit = false;
    this.isCritic = false;
    if (this.firstForm.valid) {
      const totalAttacker: number =
        this.firstForm.controls.attackerDice.value +
        this.firstForm.controls.accuracity.value;

      const totalDefender: number =
        this.firstForm.controls.defenderDice.value +
        this.firstForm.controls.velocity.value;

      if (totalAttacker > totalDefender) {
        this.msgsFirst.push([
          { severity: "success", summary: "Attacker hits defender" },
        ]);
        this.isHit = true;
      } else if (totalAttacker < totalDefender) {
        this.msgsFirst.push([
          { severity: "error", summary: "Attacker fails to hit defender" },
        ]);
      } else {
        this.msgsFirst.push([
          {
            severity: "warn",
            summary: "Attack is equal to defense, going random!",
          },
        ]);
        const rdm: number = Math.random();
        if (rdm >= 0.5) {
          this.msgsFirst.push([
            {
              severity: "success",
              summary: `Random was ${rdm}, therefore Attacker hits defender`,
            },
          ]);
          this.isHit = true;
        } else {
          this.msgsFirst.push([
            {
              severity: "error",
              summary: `Random was ${rdm}, therefore Attacker fails to hit defender`,
            },
          ]);
        }
      }

      if (this.isHit) {
        this.isCritic = this.calculateCritic();
        if (this.isCritic) {
          this.msgsFirst.push([
            { severity: "success", summary: "Critical hit!" },
          ]);
        } else {
          this.msgsFirst.push([
            { severity: "warn", summary: "No critical hit" },
          ]);
        }
      }
    } else {
      this.messageService.add({
        severity: "warn",
        summary: null,
        detail: "Form is not valid.",
      });
    }
  }

  calculateSecond() {
    this.msgsSecond = [];
    if (this.secondForm.valid && this.isHit) {
      let totalAttacker: number =
        this.secondForm.controls.attackerDice.value +
        this.secondForm.controls.damage.value;

      if (this.isCritic) {
        this.msgsSecond.push([
          {
            severity: "warn",
            summary: `Critical damage added! Before critical damage: ${totalAttacker}, after critical damage: ${(
              (totalAttacker * 4) /
              3
            ).toFixed(0)}`,
          },
        ]);
        totalAttacker = Number(((totalAttacker * 4) / 3).toFixed(0));
      }

      const totalDefender: number =
        this.secondForm.controls.defenderDice.value +
        this.secondForm.controls.defense.value;

      const totalDamage: number = totalAttacker - totalDefender;

      if (totalDamage > 0) {
        this.isBlocked = false;
        this.msgsSecond.push([
          { severity: "success", summary: `Hits with ${totalDamage}!` },
        ]);
      } else {
        this.isBlocked = true;
        this.msgsSecond.push([
          {
            severity: "error",
            summary: `The defender successfully blocks the attack! (0 damage)`,
          },
        ]);
      }
    } else if (!this.isHit) {
      this.messageService.add({
        severity: "warn",
        summary: null,
        detail: "It was not a hit...",
      });
    } else {
      this.messageService.add({
        severity: "warn",
        summary: null,
        detail: "Form is not valid.",
      });
    }
  }

  private calculateCritic(): boolean {
    const diceAttacker: number = this.firstForm.controls.attackerDice.value;
    const luckAttacker: number = this.firstForm.controls.attackerLuck.value;
    const luckDefender: number = this.firstForm.controls.defenderLuck.value;
    const totalLuck: number = (luckAttacker - luckDefender) / 4;
    if (totalLuck >= 0) {
      this.msgsFirst.push([
        {
          severity: "info",
          summary: `Total luck is ${totalLuck}, therefore critic is at ${
            this.critic - totalLuck
          }`,
        },
      ]);
      return diceAttacker >= this.critic - totalLuck;
    }
    return diceAttacker >= this.critic;
  }

  private constructFirstForm() {
    this.firstForm = this.formBuilder.group({
      attackerDice: new FormControl(0, [
        Validators.required,
        Validators.min(0),
      ]),
      accuracity: new FormControl(0, [Validators.required, Validators.min(0)]),
      attackerLuck: new FormControl(0, [
        Validators.required,
        Validators.min(0),
      ]),
      defenderDice: new FormControl(0, [
        Validators.required,
        Validators.min(0),
      ]),
      velocity: new FormControl(0, [Validators.required, Validators.min(0)]),
      defenderLuck: new FormControl(0, [
        Validators.required,
        Validators.min(0),
      ]),
    });
  }

  private constructSecondForm() {
    this.secondForm = this.formBuilder.group({
      attackerDice: new FormControl(0, [
        Validators.required,
        Validators.min(0),
      ]),
      damage: new FormControl(0, [Validators.required, Validators.min(0)]),
      defenderDice: new FormControl(0, [
        Validators.required,
        Validators.min(0),
      ]),
      defense: new FormControl(0, [Validators.required, Validators.min(0)]),
    });
  }

  private initImages() {
    this.animateUrl("assets/images/1_success", "success1Url");
    this.animateUrl("assets/images/2_success", "success2Url");
    this.animateUrl("assets/images/1_defeat", "defeat1Url");
    this.animateUrl2("assets/images/2_defeat", "defeat2Url");
  }

  private animateUrl(startUrl: string, varName: string) {
    setInterval(() => {
      this[varName] = startUrl + "_1.jpg";
      setTimeout(() => {
        this[varName] = startUrl + "_2.jpg";
      }, 500);
    }, 1000);
  }

  private animateUrl2(startUrl: string, varName: string) {
    setInterval(() => {
      this[varName] = startUrl + "_1.jpg";
      setTimeout(() => {
        this[varName] = startUrl + "_2.jpg";
      }, 500);
      setTimeout(() => {
        this[varName] = startUrl + "_3.jpg";
      }, 1000);
      setTimeout(() => {
        this[varName] = startUrl + "_4.jpg";
      }, 1500);
    }, 2000);
  }
}
