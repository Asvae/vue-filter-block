<style scoped>
    .paginator .invisible {
        visibility: hidden;
    }

    .paginator button {
        width: 3em;
    }
</style>

<template>
    <div class="paginator btn-block">
        <div v-if="pages > 1">
            <button type="button"
                    class="btn btn-primary"
                    @click="currentPage = 1"
                    :class="currentPage === 1 ? 'disabled' : ''"
                    v-if="pages > maxPages"
                    v-text="1"
            >
            </button>
            <div class="btn-group">
                <button type="button"
                        v-for="page in pagesArray"
                        class="btn"
                        :class="getClasses(page)"
                        :disabled="invisible(page)"
                        @mousedown="currentPage = page"
                        v-text="invisible(page) ? Math.abs(page - 2) : page"
                >
                </button>
            </div>
            <button type="button"
                    class="btn btn-primary"
                    @click="currentPage = pages"
                    :class="currentPage === pages ? 'disabled' : ''"
                    v-if="pages > maxPages"
                    v-text="pages"
            >
            </button>
        </div>
    </div>
</template>

<script>

    import _ from 'lodash'

    export default {
        watch: {
            currentPage (value) {
                this.$emit('page-changed', value)
            }
        },
        events: {
            reset () {
                this.currentPage = 1
            }
        },
        props: {
            pages: {
                required: true,
                type: Number,
            },
            currentPage: {
                required: false,
                type: Number,
                default: 1,
            },
            maxPages: {
                default: 5,
                type: Number,
            }
        },
        computed: {
            pagesArray () {

                if (this.pages > this.maxPages) {
                    let maxPadding = Math.floor(this.maxPages / 2)

                    let pageFirst = this.currentPage - maxPadding
                    let pageLast = this.currentPage + maxPadding

                    return _.range(pageFirst, pageLast + 1)
                }

                return _.range(1, this.pages + 1)
            }
        },
        methods: {
            getClasses (page) {
                let total = this.invisible(page) ? 'invisible ' : ''
                total += page === this.currentPage ? 'btn-success' : 'btn-default'
                return total
            },
            invisible (page) {
                return page < 1 || page > this.pages
            },
        }
    }
</script>