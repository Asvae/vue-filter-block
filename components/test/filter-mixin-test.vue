<template>
    <div>
        <select v-model="filter.editor" v-for="editor in editors">
            <option :value="editor.id" v-text="editor.name"></option>
        </select>

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
                <h4>vm-paginator-filter</h4>
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
                <p>The input, when empty, removes filter instead of producing
                    empty
                    string.</p>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-4">
                <div class="form-group">
                    <vm-sorting-order-filter name="column-1">
                        Column sorter
                    </vm-sorting-order-filter>
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

        <hr>

        <div class="row">

            <div class="col-md-4">
                <div class="panel panel-primary">
                    <div class="panel-heading">Control panel</div>
                    <div class="panel-body">
                        <button class="btn btn-sm"
                                @click="resetFilters"
                                title="Reset Filter"
                                style="height: 2.8em"
                        >
                            <i class="fa fa-times fa-lg"></i>
                        </button>
                        <button class="btn btn-sm disabled"
                                title="Refresh"
                                style="height: 2.8em"
                        >
                            <i class="fa fa-refresh fa-lg"
                               :class="{'fa-spin': filters.toUpdate}"></i>
                        </button>
                        <button class="btn btn-sm"
                                @click="saveState"
                                title="Save filter"
                                style="height: 2.8em"
                        >
                            <i class="fa fa-save fa-lg"></i>
                        </button>
                        <button class="btn btn-sm"
                                :class="{disabled: !state}"
                                @click="loadState(state)"
                                title="LoadFilter"
                                style="height: 2.8em"
                        >
                            <i class="fa fa-clipboard fa-lg"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div class="col-md-8">
                <div class="panel panel-default">
                    <div class="panel-heading">Summary of all the filters (goes
                        into
                        request).
                    </div>
                    <div class="panel-body">
                        <pre v-text="filters.data | json"
                             style="margin: 0">
                        </pre>
                    </div>
                </div>

            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <h2>Other usage examples</h2>
                <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                        <label>Date input</label>
                        <vm-removable-input-filter
                                class="form-control"
                                type="date"
                                name="removable-date"
                        ></vm-removable-input-filter>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import _ from 'lodash'

    import vmRemovableInputFilter from './../filters/removable-input-filter.vue'
    import vmThreeStateCheckboxFilter from './../filters/three-state-checkbox-filter.vue'
    import vmPaginatorFilter from './../filters/paginator-filter.vue'
    import vmSortingOrderFilter from './../filters/sorting-order-filter.vue'

    import parentMixin from './../../mixins/parent'

    export default {
        filters: {
            /** Throttling timeout. Default is 500ms. */
            timeout: 300,
            /** Local storage name, null means no storage. */
            storageName: 'filter-mixin-test',
        },
        mixins: [parentMixin],
        data() {
            return {
                filters: {
                    data: {}
                },
                state: null,
            }
        },
        components: {
            vmPaginatorFilter,
            vmRemovableInputFilter,
            vmThreeStateCheckboxFilter,
            vmSortingOrderFilter,
        },
        events: {
            'filters-formed' (filters) {
                this.filters.data = filters
            }
        },
        methods: {
            saveState() {
                this.state = _.clone(this.filters.data)
            }
        }
    }
</script>