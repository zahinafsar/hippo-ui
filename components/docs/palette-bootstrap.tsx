import themesData from "@/themes/themes.json";

const STORAGE_KEY = "hippo-palette";
const STYLE_ID = "hippo-palette";

export function PaletteBootstrap() {
  const map: Record<string, { light: Record<string, string>; dark: Record<string, string> }> = {};
  for (const t of themesData as Array<{
    name: string;
    light: Record<string, string>;
    dark: Record<string, string>;
  }>) {
    map[t.name] = { light: t.light, dark: t.dark };
  }

  const script = `(function(){try{
var M=${JSON.stringify(map)};
var n=localStorage.getItem(${JSON.stringify(STORAGE_KEY)})||${JSON.stringify(themesData[0].name)};
var t=M[n]||M[${JSON.stringify(themesData[0].name)}];
var v=function(o){var s="";for(var k in o){s+=k+":"+o[k]+";"}return s};
var css=":root{"+v(t.light)+"}.dark{"+v(t.dark)+"}";
var el=document.getElementById(${JSON.stringify(STYLE_ID)});
if(!el){el=document.createElement("style");el.id=${JSON.stringify(STYLE_ID)};document.head.appendChild(el)}
el.textContent=css;
}catch(e){}})();`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
