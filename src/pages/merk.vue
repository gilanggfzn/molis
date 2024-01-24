<template>
  <div>
    <div class="h-full min-w-full">
      <!--header content-->
      <div class="h-[160px] min-w-full bg-gray-100 flex justify-start">
        <div class="pt-12 pl-12">
          <div
            class="h-[50px] flex items-center shadow-sm px-[10px] w-full py-[10px] border-b"
          >
            <h2 class="ml-5 text-5xl font-bold">Merk</h2>
          </div>
        </div>
      </div>
    </div>

    <!--content-->
    <div class="relative m-3 mt-3">
      <!--navbar-->
      <div class="h-[60px] flex relative">
        <div class="absolute pt-6 right-20">
          <div class="relative flex items-center w-full mb-5 bottom-2 right-4">
            <!--search box-->
            <input
              type="search"
              name="search"
              v-model="search"
              class="relative w-[200px] bg-transparent rounded-lg border border-gray-500 border-opacity-20 outline-none pl-5 focus:text-gray-700 focus:cursor-text focus:pr-3 px-3 py-[0.25rem] transition duration-200 ease-in-out focus:z-[3]"
              placeholder="Search..."
              aria-label="Search..."
              aria-describedby="button-addon3"
            />
            <!--Search button-->
            <button
              @click="handleClick"
              class="relative px-2 py-1 font-medium transition duration-150 ease-in-out border-none rounded-lg text-cyan-500"
              type="button"
              id="button-addon3"
              data-te-ripple-init
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-5 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
            <!--tambah produk-->
            <button
              class="inline-flex items-center justify-center bg-cyan-600 px-[10px] ml-8 h-[35px] rounded-lg text-white text-sm font-bold hover:bg-cyan-800"
              v-on:click.prevent="onTambahMerkClick"
            >
              Tambah Merek
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
            </button>
          </div>
        </div>
      </div>
      <!--table produk-->

      <div class="border rounded-full">
        <div class="relative overflow-x-auto sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-gray-800 uppercase bg-blue-100 text-md">
              <tr>
                <th scope="col" class="px-6 py-3">No</th>
                <th scope="col" class="px-6 py-3">
                  <div class="flex items-center">Nama Merek</div>
                </th>
                <th scope="col" class="px-6 py-3">
                  <div class="flex items-center">Nama Perusahaan</div>
                </th>
                <th scope="col" class="px-6 py-3">
                  <div class="flex items-center">Link Website</div>
                </th>
                <th scope="col" class="px-6 py-3">
                  <div class="flex items-center">Aktif</div>
                </th>
                <th scope="col" class="px-6 py-3">
                  <div class="flex items-center">Aksi</div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in filterMerk"
                :key="index"
                class="text-gray-700 bg-white border-b"
              >
                <td class="px-6 py-4">{{ index + 1 }}</td>
                <td class="px-6 py-4">{{ item.namaMerk }}</td>
                <td class="px-6 py-4">{{ item.namaPerusahaan }}</td>
                <td class="px-6 py-4">
                  <a class="text-blue-500" target="_black" :href="item.linkWebsite">{{
                    item.linkWebsite
                  }}</a>
                </td>
                <td class="px-6 py-4">
                  <togglebutton
                    v-model="item.active"
                    @click="deactiveMerk(item.merkId)"
                  ></togglebutton>
                </td>
                <td class="px-4 py-2 border-b">
                  <!-- Tambahkan ikon di sini -->
                  <div class="relative inline-flex">
                    <router-link
                      id="editDealerButton"
                      class="text-sm text-gray-500 rounded-lg"
                      :to="{ name: 'editmerk', params: { id: item.merkId } }"
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
                      @click="confirmDelete(item.merkId)"
                      class="text-sm text-gray-500 rounded-lg"
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
                    Are you sure you want to delete {{ Merk.namaMerk }}?
                  </p>
                </div>
                <div class="flex justify-center space-x-4">
                  <button
                    @click="deleteById()"
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
      deleteMerkId: null,
      Merk: [],
      page: 1,
      limit:10,
      error: [],
      search: "",
    };
  },
  mounted() {
    this.fetchMerk();
  },

  watch: {
    search(newValue) {
      if (newValue === "") {
        this.fetchMerk();
      }
    },
  },

  methods: {
    onTambahMerkClick() {
      this.$router.push({ path: "/tambahmerek" });
    },
    async fetchMerk() {
      try {
        const response = await axios.get(
          "https://molis-production.up.railway.app/api/merk/active"
        );
        this.Merk = response.data;
      } catch (error) {
        console.error("Failed to fetch merk:", error);
      }
    },
    async deleteById() {
      try {
        const response = await axios.delete(
          `https://molis-production.up.railway.app/api/merk/delete/${this.deleteMerkId}`
        );
        console.log(response);
        this.showConfirm = false;
        this.fetchMerk();
      } catch (error) {
        console.error("Failed to fetch merk:", error);
      }
    },
    confirmDelete(id) {
      this.deleteMerkId = id;
      this.showConfirm = true;
    },
    cancelDelete() {
      this.showConfirm = false;
      this.deleteMerkId = null;
    },
    async deactiveMerk(id) {
      try {
        const response = await axios.put(
          `https://molis-production.up.railway.app/api/merk/toggleStatus/${id}`
        );
        console.log(response);
        this.fetchMerk();
      } catch (error) {
        console.error("gagal deactive merk:", error);
      }
    },
    async getFindByName() {
      try {
        const response = await axios.get(
          `https://molis-production.up.railway.app/api/merk/search?searchTerm=${this.search}`
        );
        this.Merk = response.data;
      } catch (error) {
        console.error("Failed to fetch merk:", error);
      }
    },
    handleClick() {
      this.getFindByName();
    },
    async updateLimit(limit) {
      this.limit = limit;
      await this.fetchMerk();
    },
  },
  computed: {
    total() {
      return this.Merk.length;
    },
    totalPages() {
      return Math.ceil(this.total / this.limit);
    },
    filterMerk() {
      const start = (this.page - 1) * this.limit;
      const end = start + this.limit;
      return this.Merk.slice(start, end);
    },
  },
};
</script>

<style></style>
