const sidebaredit = {
  name: "SidebarEdit",
  data() {
    return {
      nav: "",
      edit: "",
    }
  },
  methods: {
    openEditMenu() {
      this.nav.classList.toggle("hide")
      this.edit.classList.toggle("hide")
    }
  },
  mounted() {
    this.nav = document.getElementById("navigation")
    this.edit = document.getElementById("editmode")
  },
  template: `
    <button class="button--sidebaredit"
            id="sidebaredit"
            @click="openEditMenu">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 16 16">
              <path d="M15.8254 0.12029C15.9935 0.264266 16.0469 0.501593 15.9567 0.703697C14.4262 4.13468 11.2138 8.8743 8.86227 11.3447C8.22716 12.012 7.54616 12.4205 7.02348 12.6626C6.81786 12.7578 6.63568 12.8278 6.48885 12.878C6.4711 13.1051 6.42878 13.4159 6.32843 13.7456C6.12786 14.4046 5.66245 15.2248 4.62136 15.4851C3.5492 15.7531 2.35462 15.7535 1.54292 15.6182C1.33748 15.584 1.14585 15.5393 0.980547 15.4834C0.825775 15.4311 0.650744 15.3548 0.514627 15.2357C0.443829 15.1737 0.360185 15.0799 0.311435 14.9481C0.258258 14.8043 0.259521 14.6486 0.315083 14.5051C0.410093 14.2596 0.631487 14.1253 0.776495 14.0528C1.16954 13.8563 1.40109 13.6002 1.64337 13.2275C1.73756 13.0826 1.82737 12.9298 1.93011 12.755C1.96705 12.6921 2.00566 12.6264 2.04674 12.5572C2.1982 12.3021 2.37307 12.0176 2.59324 11.7094C3.12105 10.9705 3.79396 10.7845 4.33889 10.8132C4.46509 10.8198 4.58224 10.8377 4.68713 10.8606C4.74935 10.6888 4.82884 10.4812 4.92515 10.253C5.18625 9.63422 5.58306 8.83431 6.1124 8.18428C8.28757 5.51317 12.2914 1.97796 15.2287 0.0800421C15.4146 -0.0400593 15.6573 -0.0236867 15.8254 0.12029ZM4.70529 11.9123C4.6863 11.904 4.66255 11.8943 4.63473 11.8843C4.54498 11.8518 4.42254 11.819 4.28633 11.8118C4.03959 11.7988 3.71251 11.8629 3.40698 12.2906C3.21049 12.5657 3.05201 12.8229 2.90659 13.0678C2.87165 13.1266 2.83678 13.186 2.80193 13.2453C2.69557 13.4263 2.58935 13.6071 2.48181 13.7725C2.27563 14.0897 2.04461 14.3832 1.72254 14.6343C2.41108 14.7465 3.45779 14.7452 4.37882 14.5149C4.93773 14.3752 5.22233 13.9454 5.37176 13.4544C5.44565 13.2117 5.47846 12.9747 5.49221 12.796C5.49473 12.7633 5.49658 12.7328 5.49794 12.7049L4.70529 11.9123ZM6.14562 11.9384C6.2655 11.8982 6.42233 11.8389 6.6032 11.7552C7.03933 11.5532 7.60833 11.2117 8.13795 10.6553C10.0383 8.65889 12.5503 5.08575 14.1901 2.02381C11.5991 3.95066 8.62444 6.68316 6.88782 8.81573C6.4457 9.35865 6.09251 10.0587 5.84648 10.6418C5.72491 10.9298 5.63247 11.1822 5.57065 11.3617C5.57051 11.3622 5.57036 11.3626 5.57022 11.363L6.14562 11.9384ZM1.1724 14.9774C1.17219 14.9774 1.17409 14.9757 1.1787 14.9726C1.1749 14.9759 1.1726 14.9775 1.1724 14.9774ZM4.75419 11.9354L4.75486 11.9357L4.75612 11.9364C4.75646 11.9366 4.7558 11.9362 4.75419 11.9354Z"/>
            </svg>
    </button> 
  ` 
}   