<style>
    h2, h4 {
        color: #337ab7;
    }
</style>

<template>
    <div>
        <h2>Components and resulting filter example</h2>

        <div class="row">

            <div class="col-sm-4">
                <h4>
                    Three state checkbox
                    <br>
                    <small><code>vm-three-state-checkbox-filter</code></small>
                </h4>
                <div class="well">
                    <label>Check me!
                        <vm-three-state-checkbox-filter
                                name="three-checkbox"
                        ></vm-three-state-checkbox-filter>
                    </label>
                </div>
                <p>
                    Three state checkbox filter. Undetermined means not
                    <code>null</code> but missing filter.
                </p>
                <pre>&lt;label&gt;Check me!
    &lt;vm-three-state-checkbox-filter
        name=&quot;three-checkbox&quot;
    &gt;&lt;/vm-three-state-checkbox-filter&gt;
&lt;/label&gt;</pre>
            </div>

            <div class="col-sm-4">
                <h4>
                    Paginator
                    <br>
                    <small><code>vm-paginator-filter</code></small>
                </h4>
                <div class="well">
                    <vm-paginator-filter
                            name="page"
                            :pages="10"
                    ></vm-paginator-filter>
                </div>
                <p>
                    Pagination block. First page means empty filter. Paginator
                    ignores saved state and always defaults to empty.
                </p>
                <pre>&lt;vm-paginator-filter
     name=&quot;page&quot;
     :pages=&quot;10&quot;
&gt;&lt;/vm-paginator-filter&gt;</pre>
            </div>


            <div class="col-sm-4">
                <h4>
                    Removable input filter
                    <br>
                    <small><code>vm-removable-input-filter</code></small>
                </h4>
                <div class="well">
                    <vm-removable-input-filter
                            class="form-control"
                            name="removable-input"
                    ></vm-removable-input-filter>
                </div>
                <p>
                    Removable input, when empty, removes filter
                    instead of producing empty string.
                </p>
                <pre>&lt;vm-removable-input-filter
    class=&quot;form-control&quot;
    name=&quot;removable-input&quot;
&gt;&lt;/vm-removable-input-filter&gt;</pre>
            </div>
        </div>

        <br>
        <br>

        <div class="row">

            <div class="col-sm-4">
                <h4>
                    Filter wrapper
                    <br>
                    <small><code>vm-wrapper-filter</code></small>
                </h4>
                <div class="well">
                    <vm-wrapper-filter
                            content="vm-select"
                            name="wrapped-select"
                            value="1"
                    ></vm-wrapper-filter>
                </div>
                <p>
                    Wraps another component. Resulting component
                    can be disabled and integrates with parent.
                    In simplest cases that is enough
                    to modify random component into functional filter.</p>
                <p>Wrapper binds itself to <code>value</code> property of underlying component.
                    So that property should be defined. If not, better just use mixin. Or maybe post
                    your idea on <a href="https://github.com/Asvae/vue-filters/issues">github issues</a>.
                </p>
                <pre>&lt;vm-wrapper-filter
    content=&quot;vm-select&quot;
    name=&quot;removable-input&quot;
&gt;&lt;/vm-wrapper-filter&gt;</pre>
            </div>


            <div class="col-sm-4">
                <h4>
                    Column sorter
                    <br>
                    <small><code>vm-sorting-order-filter</code></small>
                </h4>
                <div class="well">
                    <vm-sorting-order-filter name="column-sorter">
                        Sort me!
                    </vm-sorting-order-filter>
                </div>
                <p>
                    Your common table sorter. Unordered means no filter.
                </p>
                <pre>&lt;vm-sorting-order-filter name=&quot;column-sorter&quot;&gt;
    Sort me!
&lt;/vm-sorting-order-filter&gt;</pre>
            </div>

            <div class="col-sm-4">

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

                <div class="panel panel-success">
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
                <div class="row">
                    <div class="col-md-4">
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
    </div>
</template>

<script>
    import _ from 'lodash'

    import vmRemovableInputFilter from './../filters/removable-input-filter.vue'
    import vmThreeStateCheckboxFilter from './../filters/three-state-checkbox-filter.vue'
    import vmPaginatorFilter from './../filters/paginator-filter.vue'
    import vmSortingOrderFilter from './../filters/sorting-order-filter.vue'
    import vmWrapperFilter from './../filters/wrapper-filter.vue'

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
            vmWrapperFilter,
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