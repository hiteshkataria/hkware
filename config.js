//const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyZs7Xr2OxZdwMg-iZFJYaBDrj3ik5H-mkXKncQrMPyvPXvnfDmkWGP9O0eFpVxe_U1Xw/exec';
//const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw8EfEU_GbS1bEo0Z0xfR8m-kPgiJNxo70x979XaRFiKLk5S4F7giAXlfh_nc7tHkwjlA/exec';
//const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbytgDdljUUSrcqx2E7RH3tk7AEYGUfmhbEzyTeud5tMa1IRC8RLD_OxrD66RKiHziyzYg/exec';
//const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwaSXGbJPp6MrKhztSUegMFsuR50WoxsQp7sld2mpWH3kVLRxAdxb4NjleFGhCcIS-ztA/exec';
//const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwdtd7M7euMDRI8-S4OoImvHrDwQLYIBJ33Dgwv2ejnJEH6bwOUnHmMzgvxeni5U0Ia_A/exec';

const ENV_CONFIG = {
  SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbys-O_WgkmM8oy1Bned3DNc1wlynFItC2kqezOo6bg9c4ThSScnI4UQljDdwlvnj67YqQ/exec'
};

if (window.location.hostname.includes('dev') {
  ENV_CONFIG.SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwdtd7M7euMDRI8-S4OoImvHrDwQLYIBJ33Dgwv2ejnJEH6bwOUnHmMzgvxeni5U0Ia_A/exec';
}
