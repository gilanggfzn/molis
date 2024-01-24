<template>
  <div class="w-full h-full overflow-y-scroll">
    <div class="">
      <!--header content-->
      <div class="h-[160px] w-full bg-gray-100 flex justify-start mb-2">
        <div class="pt-12 pl-10">
          <div class="h-[50px] flex items-center shadow-sm min-w-full py-[10px]">
            <h2 class="pt-24 text-5xl font-bold">Dealer</h2>
          </div>
        </div>
      </div>
      <!--content-->
      <div class="relative m-3 mx-10 mt-3">
        <!--navbar-->
        <div class="min-w-full mb-3">
          <div class="absolute flex right-4">
            <input
              v-model="search"
              type="search"
              name="search"
              class="relative  w-[200px] bg-transparent rounded-lg border border-gray-500 border-opacity-20 outline-none pl-5 focus:text-gray-700 focus:cursor-text focus:pr-3 px-3 py-[0.25rem] transition duration-200 ease-in-out focus:z-[3]"
              placeholder="Cari..."
              aria-label="Cari..."
              aria-describedby="button-addon3"
            />
            <button
              class="relative px-2 py-1 font-medium transition duration-150 ease-in-out border-none rounded-lg text-cyan-500"
              type="button"
              id="searchButton"
              @click="handleClick"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="h-6 w-7"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
            <br />
            <div class="relative">
              <router-link
                to="/listdealertable"
                class="inline-flex rounded-lg items-center justify-center bg-cyan-600 px-[10px] h-[35px] text-white text-sm font-bold hover:bg-cyan-800"
                v-on:click.prevent="onTambahDealerClick"
              >
                Tambah Dealer
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 ml-3"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </router-link>
            </div>
          </div>
        </div>
        <br />
        <br />

        <!-- Table -->

        <div clas="border rounded-full">
          <div class="relative overflow-x-auto sm:rounded-lg">
            <table
              id="dealertable"
              class="min-w-full border border-gray-500 rounded-lg border-opacity-10"
            >
              <!-- Table headers -->
              <thead
                class="h-auto px-2 py-2 tracking-wider uppercase bg-blue-100 border-opacity-0 rounded-lg"
              >
                <tr>
                  <th scope="col" class="px-6 py-4">No</th>
                  <th scope="col" class="px-6 py-4">Nama Dealer</th>
                  <th scope="col" class="px-6 py-4">Kontak</th>
                  <th scope="col" class="px-6 py-4">Link Website</th>
                  <th scope="col" class="px-6 py-4">Merk</th>
                  <th scope="col" class="px-6 py-4">Aktif</th>
                  <th scope="col" class="px-6 py-4">Aksi</th>
                </tr>
              </thead>
              <!-- Table body -->
              <tbody>
                <tr
                  v-for="(dealer, index) in filterDealer"
                  :key="index"
                  class="h-auto border-b border-gray-500 border-opacity-10"
                >
                  <th class="px-6 py-4 my-4 text-base whitespace-nowrap">
                    {{ index + 1 }}
                  </th>
                  <td class="px-4 py-4 my-4 text-base whitespace-nowrap">
                    {{ dealer.namaDealer }}
                  </td>
                  <td class="px-4 py-4 my-4 text-base whitespace-nowrap">
                    {{ dealer.kontak }}
                  </td>
                  <td class="px-4 py-4 my-4 text-base whitespace-nowrap">
                    {{ dealer.linkWebsite }}
                  </td>
                  <td class="px-4 py-4 my-4 text-base whitespace-nowrap">
                    {{ dealer.merk?.namaMerk }}
                  </td>
                  <td class="px-6 py-4 my-4 text-base whitespace-nowrap">
                    <togglebutton
                      v-model="dealer.active"
                      @click="deactiveDealer(dealer.dealerId)"
                    ></togglebutton>
                  </td>
                  <td class="pl-4 my-4 py-42 whitespace-nowrap" >
                    <div class="relative inline-flex">
                      <router-link
                        id="editDealerButton"
                        class="text-sm text-gray-500 rounded-lg"
                        :to="{ name: 'editDealer', params: { id: dealer.dealerId } }"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6 ml-3"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </router-link>
                      <button
                        id="deleteDealerButton"
                        class="text-sm text-gray-500 rounded-lg"
                        @click="confirmDelete(dealer.dealerId)"
                        
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6 ml-3"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!--pagination-->
          <div class="inline-flex my-3">
            <div class="absolute left-0 inline-flex ml-3">
              <p class="px-3 mx-2 mt-2">Menampilkan</p>
              <select
                class="px-3 focus-border-cyan300"
                @change="updateLimit($event.target.value)"
              >
                <option value="10">10</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
            <ul class="absolute inline-flex space-x-2 right-1">
              <li>
                <button
                  class="px-4 text-black rounded-lg hover:bg-cyan-800 hover:text-white"
                  @click="page--"
                  :disabled="page === 1"
                >
                  Prev
                </button>
              </li>
              <li>
                <button
                  class="px-4 text-black rounded-lg hover:bg-cyan-800 hover:text-white"
                  @click="page--"
                  :hidden="page === 1"
                >
                  {{ page - 1 }}
                </button>
              </li>
              <li>
                <p class="items-center justify-center px-4 rounded-lg bg-cyan-600">
                  {{ page }}
                </p>
              </li>
              <li>
                <button
                  @click="page++"
                  :hidden="page === totalPages"
                  class="px-4 text-black rounded-lg hover:bg-cyan-800 hover:text-white"
                >
                  {{ page + 1 }}
                </button>
              </li>
              <li>
                <button
                  class="px-4 text-black rounded-lg hover:bg-cyan-800 hover:text-white"
                  @click="page++"
                  :disabled="page * limit >= total"
                >
                  Next
                </button>
              </li>
            </ul>
          </div>
        </div>
        <!--confirm dialog-->
        <div
          v-if="showConfirm"
          class="fixed inset-0 z-10 overflow-y-auto bg-gray-500 bg-opacity-50"
        >
          <div class="flex items-center justify-center min-h-screen">
            <div class="fixed inset-0 transition-opacity">
              <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div class="relative p-6 m-4 bg-white rounded-xl shadow-lg w-[300px]">
              <div class="mb-4">
                <p class="mb-2 text-lg font-bold">Confirm Delete</p>
                <p class="text-gray-600">
                  Are you sure you want to delete {{ filterDealer.namaDealer }}?
                </p>
              </div>
              <div class="flex justify-center space-x-4">
                <button
                  @click="deleteDealer()"
                  class="px-4 py-2 w-[100px] font-medium leading-normal text-white border-2 rounded-lg border-cyan-600 bg-cyan-500 hover:bg-cyan-700 hover:bg-opacity-100 hover:text-white focus:border-cyan-600 focus:text-gray-800 focus:outline-none focus:ring-0 active:border-cyan-600 active:text-gray-700"
                >
                  Ya
                </button>
                <button
                  @click="cancelDelete()"
                  class="px-4 py-2 w-[100px] font-medium leading-normal border-2 rounded-lg border-cyan-500 text-cyan-600 hover:border-cyan-500 hover:bg-cyan-500 hover:bg-opacity-40 hover:text-white focus:border-cyan-600 focus:text-gray-800 focus:outline-none focus:ring-0 active:border-cyan-600 active:text-gray-700"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--main-->
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      showConfirm: false,
      deleteDealerId: null,
      dealers: [],
      error: [],
      search: "",
      limit: 10,
      page: 1,
      totaldealers: "",
    };
  },
  mounted() {
    this.fetchDealers();
  },
  watch: {
    search(newValue) {
      if (newValue === "") {
        this.fetchDealers();
      }
    },
    page(){
      if(this.totaldealers < 11){
        this.page===1
      }
    }

  },
  methods: {
    fetchDealers() {
      axios
        .get("https://molis-production.up.railway.app/api/dealers/active")
        .then((response) => {
          this.dealers = response.data;
          console.log(this.dealers);
          this.totaldealers = response.data.length;
          console.log(this.totaldealers);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    async searchDealerByName() {
      try {
        const response = await axios.get(
          `https://molis-production.up.railway.app/api/dealers/search?searchTerm=${this.search}`
        );
        this.dealers = response.data;
      } catch (error) {
        console.error("Failed to fetch dealers:", error);
      }
    },
    gotoEditDealer(dealerId){
      this.$router.push({ name: 'editDealer', params: { id: dealerId } });
    },
    handleClick() {
      this.searchDealerByName();
    },
    async deleteDealer() {
      try {
        const response = await axios.delete(
          `https://molis-production.up.railway.app/api/dealers/delete/${this.deleteDealerId}`
        );
        console.log(response);
        this.fetchDealers();
        this.showConfirm = false;
      } catch (error) {
        console.error("Gagal menghapus dealer:", error);
      }
    },
    confirmDelete(id) {
      this.showConfirm = true;
      this.deleteDealerId = id;
    },
    cancelDelete() {
      this.showConfirm = false;
      this.deleteDealerId = null;
    },
    async deactiveDealer(id) {
      try {
        const response = await axios.put(
          `https://molis-production.up.railway.app/api/dealers/${id}/deactivate`
        );
        console.log(response);
      } catch (error) {
        console.error("Gagal deactive dealer:", error);
      }
    },
    onTambahDealerClick() {
      this.$router.push({ path: "/listdealertable" });
    },
    onEditDealerClick() {
      this.$router.push({ path: "/editdealer" });
    },
    async updateLimit(limit) {
      this.limit = limit;
      await this.fetchDealers();
    },
  },
  computed: {
    total() {
      return this.dealers.length;
    },
    totalPages() {
      return Math.ceil(this.total / this.limit);
    },
    filterDealer() {
      const start = (this.page - 1) * this.limit;
      const end = start + this.limit;
      return this.dealers.slice(start, end);
    },
  },
};
</script>

<style>
.active-page {
  background-color: #3498db;
  border: 1px solid #3498db;
  color: white;
}
.active-page:hover {
  background-color: #2988c8;
}
</style>
