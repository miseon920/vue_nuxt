<template>
    <div>
        <header>
            <h1>
                 <NuxtLink to="/"><img src="~/assets/img/logo.png" alt=""></NuxtLink>
            </h1>
            <nav>
                <ul>
                    <li><a href="/">home</a></li>
                    <li><NuxtLink to="/about">about</NuxtLink></li>
                    <li><NuxtLink to="/product">product</NuxtLink></li>
                    <!-- NuxtLink는 vue에서의 router-link 와 같은 역할을 함 -->
                </ul>
            </nav>
        </header>
        <h2>Shopping > {{$route.props}}
            <template v-if="$route && $route.params.id">
                {{$route.params.id}}
            </template>
            <template v-else>
                 {{$route.name}}
            </template>    
        </h2> 
    </div>
</template>

<script>
export default {
}
</script>

<style>

</style>