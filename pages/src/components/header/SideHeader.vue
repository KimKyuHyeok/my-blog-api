<template>
    <div class="menu">
        <div class="buttonList">
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/admin">Admin</a></li>
                    <li><a href="https://github.com/KimKyuHyeok">GitHub</a></li>
                </ul>
            </nav>
        </div>
        <SideMenu></SideMenu>
    </div>
</template>

<script>
import SideMenu from './Menu.vue'

export default {
    components: {
        SideMenu
    }
}
</script>

<style>
    * {
        margin: 0;
        padding: 0;
    }

    .menu {
        position: relative;
        display: flex;
        flex-direction: column;
        padding: 0;
        margin-top: 30%;
    }

    .buttonList {
        width: 100%;
        background-color: transparent;
        padding: 10px;
        box-sizing: border-box;
    }

    .buttonList nav ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
    }

    .buttonList nav ul li {
        margin: 0 10px;
    }

    .buttonList nav ul li a {
        border-bottom: 1px solid white;
        color: white;
        text-decoration: none;
        font: inherit;
    }

    .buttonList nav ul li a:hover {
        border-bottom: 1px solid skyblue;
        color: skyblue;
        text-decoration: none;
        font: inherit;
    }
</style>