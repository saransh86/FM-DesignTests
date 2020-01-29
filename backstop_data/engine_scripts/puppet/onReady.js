module.exports = async (page, scenario, vp) => {
  console.log('SCENARIO > ' + scenario.label);
  await require('./clickAndHoverHelper')(page, scenario);

  if(scenario.postInteractionWaitSelectors){
    for(const postInteractionWaitSelectorItem of [].concat(scenario.postInteractionWaitSelectors)){
      console.log("Got the post interaction!", postInteractionWaitSelectorItem);
      await page.waitFor(postInteractionWaitSelectorItem);
      await page.waitFor(100);
      // const element = await page.$("#forgotPasswordText");
      // const text = await page.evaluate(element => element.textContent, element);
      // console.log("What we got!?", text);
    }
  }
  // add more ready handlers here...
};
