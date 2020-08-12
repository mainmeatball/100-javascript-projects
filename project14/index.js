var app=function(e){"use strict";function t(e,t){const o=(t||document).querySelector(""+e);if(!o)throw new Error(`Expected "${e}" to be available in DOM`);return o}var o;!function(e){e.INPUT_FIELD="#input-field",e.GROCERY_LIST="#grocery-list",e.GROCERY_ITEM_TEMPLATE="#grocery-item-template",e.GROCERY_ITEM=".grocery-item",e.GROCERY_ITEM_NAME=".grocery-item-name",e.GROCERY_ITEM_REMOVE_BUTTON=".grocery-item-remove-button"}(o||(o={}));class r{constructor(e){this.boundCallbackFn=()=>!0,this.boundRemoveButtonFn=this.remove.bind(this);const r=t(o.GROCERY_ITEM_TEMPLATE).content.cloneNode(!0);this.name=t(o.GROCERY_ITEM_NAME,r),this.removeButton=t(o.GROCERY_ITEM_REMOVE_BUTTON,r),this.domElement=t(o.GROCERY_ITEM,r),this.name.textContent=e,this.removeButton.addEventListener("click",this.boundRemoveButtonFn)}remove(){this.removeButton.removeEventListener("click",this.boundRemoveButtonFn),this.domElement.remove(),this.boundCallbackFn(this)}getName(){return this.name.textContent||""}createBound(e){this.boundCallbackFn=e}renderInto(e){e.appendChild(this.domElement)}}class n{constructor(){this.STORAGE_KEY="grocery-list"}getNames(){return JSON.parse(localStorage.getItem(this.STORAGE_KEY)||"[]")}add(e){const t=this.getNames();t.push(e.getName()),localStorage.setItem(this.STORAGE_KEY,JSON.stringify(t))}remove(e){const t=this.getNames(),o=t.findIndex(t=>e.getName()===t);if(-1===o)throw new Error(`Expected "${e.getName()}" to be present in local storage`);t.splice(o,1),localStorage.setItem(this.STORAGE_KEY,JSON.stringify(t))}}const s=t(o.INPUT_FIELD),i=new class{constructor(){this.groceryList=t(o.GROCERY_LIST),this.groceryLocalStorage=new n,this.items=[]}renderLocalStorageItems(){this.groceryLocalStorage.getNames().forEach(e=>this.saveAndRender(new r(e)))}add(e){const t=new r(e);this.saveAndRender(t),this.groceryLocalStorage.add(t)}clearItems(){[...this.items].forEach(e=>e.remove())}saveAndRender(e){e.createBound(this.remove.bind(this)),this.items.push(e),e.renderInto(this.groceryList)}remove(e){this.groceryLocalStorage.remove(e);const t=this.items.findIndex(t=>t.getName()===e.getName());-1!==t&&this.items.splice(t,1)}};return i.renderLocalStorageItems(),e.addItem=function(){const e=s.value||"";i.add(e),s.value="",s.focus()},e.clearItems=function(){i.clearItems()},e}({});
