import { debug, error, i18n } from '../environment-interaction-main';
import { ContestedRoll } from '../lib/tokenbarapi/ContestedRoll';
import { EnvironmentInteractionNote } from './environment-interaction-note';
import { EnvironmentInteraction } from './environment-interaction';
import { Flags } from './environment-interaction-models';
import { getCanvas, getGame, moduleName } from './settings';

export const readyHooks = async () => {
  // Register hook callbacks
  // @ts-ignore
  getGame().EnvironmentInteraction.registerHooks();

  Hooks.on('tokenBarUpdateRoll', (tokenBarApp: ContestedRoll | Roll, message: ChatMessage, updateId: string, msgtokenRoll: Roll) => {
    // tokenBarApp can be any app of token bar moduel e.g. SavingThrow
    const token = getGame().actors?.get(updateId);
    const checkout = msgtokenRoll.total;
  });

  Hooks.on('forceUpdateTokenActionHUD', (args) => {
    const checkout = args;
  });

  /*
  setupTinyMCEEditor();
  //@ts-ignore
  libWrapper.register(moduleName, 'TextEditor.enrichHTML', textEditorEnrichHTMLHandler, 'MIXED');
  //@ts-ignore
  libWrapper.register(moduleName, 'TextEditor.create', textEditorCreateHandler, 'MIXED');
  */

  Hooks.on('renderItemSheet', (app, html, data) => {
    EnvironmentInteractionNote._initEntityHook(app, html, data);
  });

  // //@ts-ignore
  // Item.prototype.hasEIMacro = function () {
  //   return !!this.getFlag(moduleName, Flags.notes)?.data?.command;
  // };
  // //@ts-ignore
  // Item.prototype.executeEIMacro = function (...args) {
  //   if (!this.hasEIMacro()) {
  //     return;
  //   }
  //   // switch(this.getMacro().data.type){
  //   //   case "chat" :
  //   //     //left open if chat macros ever become a thing you would want to do inside an item?
  //   //     break;
  //   // case "script" :
  //   return this._executeEIScript(...args);
  //   // }
  // };
  // //@ts-ignore
  // Item.prototype._executeEIScript = function (macroFlag:string, ...args) {
  //   //add variable to the evaluation of the script
  //   const item = <Item>this;
  //   const macro = <Macro>item.getFlag(moduleName, macroFlag);
  //   const speaker = ChatMessage.getSpeaker({ actor: <Actor>item.actor });
  //   const actor = item.actor ?? getGame().actors?.get(<string>speaker.actor);
  //   const token = item.actor?.token ?? getCanvas().tokens?.get(<string>speaker.token);
  //   const character = getGame().user?.character;
  //   const event = getEvent();

  //   debug(macro);
  //   debug(speaker);
  //   debug(actor);
  //   debug(token);
  //   debug(character);
  //   debug(item);
  //   debug(event);
  //   debug(args);

  //   //build script execution
  //   const body = `(async ()=>{
  //     ${macro.data.command}
  //   })();`;
  //   const fn = Function('item', 'speaker', 'actor', 'token', 'character', 'event', 'args', body);

  //   //attempt script execution
  //   try {
  //     fn.call(macro, item, speaker, actor, token, character, event, args);
  //   } catch (err) {
  //     ui.notifications?.error(i18n(`${moduleName}.macroExecution`));
  //     error(err);
  //   }

  //   function getEvent() {
  //     const a = args[0];
  //     if (a instanceof Event) return args[0].shift();
  //     if (a?.originalEvent instanceof Event) return args.shift().originalEvent;
  //     return undefined;
  //   }
  // };
};

export const initHooks = async () => {
  // Open module API
  // @ts-ignore
  getGame().EnvironmentInteraction = EnvironmentInteraction;

  // Register settings
  // @ts-ignore
  // getGame().EnvironmentInteraction.registerSettings();

  // Register Handlebars helpers
  // @ts-ignore
  getGame().EnvironmentInteraction.registerHandlebarsHelpers();
};

export const setupHooks = async () => {
  // Do anything after initialization but before ready
  // Register wrappers
  // @ts-ignore
  getGame().EnvironmentInteraction.registerWrappers();
};

/*
export const setupTinyMCEEditor = function () {
  // Add custom stylesheet to TinyMCE Config
  //@ts-ignore
  CONFIG.TinyMCE.content_css.push(`/modules/${moduleName}/styles/environment-interaction-secret.css`);
  if (getGame().user?.isGM) {
    // Add GM Secret section type
    //@ts-ignore
    const customFormats = CONFIG.TinyMCE.style_formats.find((x) => x.title === 'Custom');
    //@ts-ignore
    customFormats.items.push({
      title: 'GM Secret',
      block: 'section',
      classes: 'secret gm-secret',
      wrapper: true,
    });

    // If the user is a GM, add a unique class to the body of the document so that we can selectively hide content when this class doesn't exist.
    $('body').addClass('game-master');
  }
};

// Wrap TextEditor.create to add the appropriate class to the created editor
export const textEditorCreateHandler = function (wrapped, ...args) {
  // const oldCreate = TextEditor.create;
  // const editor = await oldCreate.apply(this, arguments);
  const editor = this as any;
  // If the user is a GM, add the "game-master" class to the tinyMCE iframe body.
  if (getGame().user?.isGM) {
    editor.dom.addClass('tinymce', 'game-master');
  }

  return editor;
  // return wrapped(...args);
};

// Wrap TextEditor.enrichHTML to remove GM secret sections if the user is not a GM
export const textEditorEnrichHTMLHandler = function (wrapped, ...args) {
  // const oldEnrichHTML = TextEditor.enrichHTML;
  // const content = oldEnrichHTML.apply(this, arguments);
  const content = this as string;
  const html = document.createElement('div');
  html.innerHTML = content;

  if (!getGame().user?.isGM) {
    const elements: NodeListOf<Element> = html.querySelectorAll('section.gm-secret');
    elements.forEach((e) => e?.parentNode?.removeChild(e));
  }
  return html.innerHTML;
  // return wrapped(...args);
};
*/