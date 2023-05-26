import * as _ from "../../../../support/Objects/ObjectsCore";
import {
  ROW_GAP,
  MOBILE_ROW_GAP,
} from "../../../../../src/utils/autoLayout/constants";

describe("Validating use cases for Auto Dimension", () => {
  before(() => {
    _.propPane.ConvertToAutoLayout();
    _.entityExplorer.DragDropWidgetNVerify("inputwidgetv2", 100, 20);
    _.entityExplorer.DragDropWidgetNVerify("inputwidgetv2", 5, 10);
    _.entityExplorer.DragDropWidgetNVerify("inputwidgetv2", 100, 75);
  });

  it(`1. Validating row gap of ${ROW_GAP}px for desktop view`, () => {
    cy.get(".t--widget-input1").then((widget) => {
      const input1Bottom = widget.get(0).getBoundingClientRect().bottom;
      cy.get(".t--widget-input3").then((widget) => {
        const input3Top = widget.get(0).getBoundingClientRect().top;
        // Subtracting 4px to account for the bounding box border width
        expect(input3Top - input1Bottom - 4).to.be.equal(ROW_GAP);
      });
    });
  });

  it(`2. Validating row gap of ${MOBILE_ROW_GAP}px for mobile view (non-wrapped widgets)`, () => {
    _.agHelper.SetCanvasViewportWidth(375);
    _.agHelper.Sleep();
    cy.get(".t--widget-input1").then((widget) => {
      const input1Bottom = widget.get(0).getBoundingClientRect().bottom;
      cy.get(".t--widget-input3").then((widget) => {
        const input3Top = widget.get(0).getBoundingClientRect().top;
        // Subtracting 4px to account for the bounding box border width
        expect(input3Top - input1Bottom - 4).to.be.equal(MOBILE_ROW_GAP);
      });
    });
  });

  it(`3. Validating row gap of ${MOBILE_ROW_GAP}px for mobile view - (wrapped widgets)`, () => {
    cy.get(".t--widget-input2").then((widget) => {
      const input2Bottom = widget.get(0).getBoundingClientRect().bottom;
      cy.get(".t--widget-input1").then((widget) => {
        const input1Top = widget.get(0).getBoundingClientRect().top;
        // Subtracting 4px to account for the bounding box border width
        expect(input1Top - input2Bottom - 4).to.be.equal(MOBILE_ROW_GAP);
      });
    });
  });
});
