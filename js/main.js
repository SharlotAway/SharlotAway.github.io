const app = Vue.createApp({
    mixins: Object.values(mixins),
    data() {
        return {
            loading: true,
            hiddenMenu: false,
            showMenuItems: false,
            menuColor: false,
            scrollTop: 0,
            renderers: [],
        };
    },
    created() {
        const finishLoading = () => {
            this.loading = false;
        };

        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", finishLoading, { once: true });
        } else {
            finishLoading();
        }

        window.setTimeout(finishLoading, 1200);
    },
    mounted() {
        window.addEventListener("scroll", this.handleScroll, true);
        this.render();
    },
    methods: {
        render() {
            for (let i of this.renderers) i();
        },
        handleScroll() {
            let wrap = this.$refs.homePostsWrap;
            let head = document.getElementById("home-head");
            let newScrollTop = document.documentElement.scrollTop;
            if (this.scrollTop < newScrollTop) {
                this.hiddenMenu = true;
                this.showMenuItems = false;
            } else this.hiddenMenu = false;
            if (wrap) {
                let colorLine = head ? head.offsetHeight - 100 : window.innerHeight - 100;
                if (newScrollTop <= colorLine) this.menuColor = true;
                else this.menuColor = false;
            }
            this.scrollTop = newScrollTop;
        },
    },
});
app.mount("#layout");
