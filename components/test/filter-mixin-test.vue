<style>

</style>

<template>
    <select v-model="filter.editor" v-for="editor in editors">
        <option :value="editor.id" v-text="editor.name"></option>
    </select>

    <!--

    <div class="row">
        <div class="col-sm-4">
            <vm-filter-wrapper filter="vm-country-select"
                               name="country-select"
                               title="Countries"
                               value="BY"
            ></vm-filter-wrapper>
        </div>
        <pre class="col-sm-4">
&lt;vm-filter-wrapper filter=&quot;vm-country-select&quot;
                   name=&quot;country-select&quot;
                   title=&quot;Countries&quot;
                   value=&quot;BY&quot;
&gt;&lt;/vm-filter-wrapper&gt;</pre>
        <div class="col-sm-4">
            <h4>vm-filter-wrapper</h4>
            <p>Wraps underlying element: binds itself to <code>value</code> and
                follows filter interface.</p>
        </div>
    </div>

    -->

    <div class="row">
        <div class="col-sm-4">
            <label>Checkbox
                <vm-three-state-checkbox-filter
                        name="three-checkbox"
                ></vm-three-state-checkbox-filter>
            </label>
        </div>
        <pre class="col-sm-4">
&lt;label&gt;Checkbox
    &lt;vm-three-state-checkbox-filter
            name=&quot;three-checkbox&quot;
    &gt;&lt;/vm-three-state-checkbox-filter&gt;
&lt;/label&gt;</pre>
        <div class="col-sm-4">
            <h4>vm-three-state-checkbox-filter</h4>
            <p>Three state checkbox filter. Undetermined means not
                <code>null</code> but missing filter.</p>
        </div>
    </div>

    <div class="row">
        <div class="col-sm-4">
            <div class="form-group">
                <label>Paginator</label>
                <vm-paginator-filter
                        name="page"
                        :pages="10"
                ></vm-paginator-filter>
            </div>
        </div>
        <pre class="col-sm-4">
&lt;div class=&quot;form-group&quot;&gt;
    &lt;label&gt;Paginator&lt;/label&gt;
    &lt;vm-paginator-filter
         name=&quot;page&quot;
         :pages=&quot;10&quot;
    &gt;&lt;/vm-paginator-filter&gt;
&lt;/div&gt;</pre>
        <div class="col-sm-4">
            <h4>vm-filter-paginator</h4>
            <p>Pagination block. First page means empty filter. Paginator
                ignores saved state and always defaults to empty.</p>
        </div>
    </div>

    <div class="row">
        <div class="col-sm-4">
            <div class="form-group">
                <label>Removable input filter</label>
                <vm-removable-input-filter
                        class="form-control"
                        name="removable-input"
                ></vm-removable-input-filter>
            </div>
        </div>
        <pre class="col-sm-4">
&lt;div class=&quot;form-group&quot;&gt;
    &lt;label&gt;Removable input filter&lt;/label&gt;
    &lt;vm-removable-input-filter
            class=&quot;form-control&quot;
            name=&quot;removable-input&quot;
    &gt;&lt;/vm-removable-input-filter&gt;
&lt;/div&gt;</pre>
        <div class="col-sm-4">
            <h4>vm-removable-input-filter</h4>
            <p>The input, when empty, removes filter instead of producing empty
                string.</p>
        </div>
    </div>

    <div class="row">
        <div class="col-sm-4">
            <div class="form-group">
                <label>Column sorter</label>
                <vm-sorting-order-filter
                        name="column-1"
                ></vm-sorting-order-filter>
            </div>
        </div>
        <pre class="col-sm-4">
&lt;div class=&quot;form-group&quot;&gt;
    &lt;label&gt;Column sorter&lt;/label&gt;
    &lt;vm-sorting-order-filter
            name=&quot;column_1&quot;
    &gt;&lt;/vm-sorting-order-filter&gt;
&lt;/div&gt;</pre>
        <div class="col-sm-4">
            <h4>vm-sorting-order-filter</h4>
            <p>Your common table sorter. Unordered means no filter.</p>
        </div>
    </div>

    <div class="panel panel-default">
        <div class="panel-heading">Summary of all the filters (that stuff goes to request).</div>
        <div class="panel-body">

            <div class="row">
                <div class="col-md-2">
                    <button class="btn"
                            @click="resetFilters"
                            title="Сбросить фильтры"
                            style="height: 2.8em"
                    >
                        <i class="fa fa-times fa-lg"></i>
                    </button>
                    <button class="btn disabled"
                            title="Обновить таблицу"
                            style="height: 2.8em"
                    >
                        <i class="fa fa-refresh fa-lg"
                           :class="{'fa-spin': this.filters.toUpdate}"></i>
                    </button>
                </div>
                <div class="col-md-10">
                    <pre v-text="filters.data" style="height: 100%"></pre>
                </div>

            </div>

        </div>
    </div>

</template>

<script>
    export default {
        mixins: [
            require('./../../mixins/parent'),
        ],
        data: function () {
            return {
                filters: {
                    data: ''
                }
            }
        },
        components: {
            vmPaginatorFilter: require('./../filters/paginator-filter.vue'),
            vmRemovableInputFilter: require('./../filters/removable-input-filter.vue'),
            vmThreeStateCheckboxFilter: require('./../filters/three-state-checkbox-filter.vue'),
            vmSortingOrderFilter: require('./../filters/sorting-order-filter.vue'),
        },
        events: {
            'filters-formed': function (filters) {
                this.filters.data = JSON.stringify(filters)
            }
        },
        filters: {
            storageName: 'filter-mixin-test',
        }
    }
</script>