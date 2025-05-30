const ENV_CONFIG = {
  SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbys-O_WgkmM8oy1Bned3DNc1wlynFItC2kqezOo6bg9c4ThSScnI4UQljDdwlvnj67YqQ/exec'
};

if (window.location.hostname.includes('dev') {
  ENV_CONFIG.SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwdtd7M7euMDRI8-S4OoImvHrDwQLYIBJ33Dgwv2ejnJEH6bwOUnHmMzgvxeni5U0Ia_A/exec';
}
