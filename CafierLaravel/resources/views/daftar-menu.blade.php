<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daftar Menu - Serene</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    
    <style>
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
        input[type="number"] {
            -moz-appearance: textfield;
        }
    </style>
</head>
<body class="m-0 p-0 bg-[#e3dac9] font-sans min-h-screen text-gray-800">

    <nav class="w-full bg-[#3d2a1d] px-8 py-3 flex justify-between items-center shadow-md relative">
        <div class="flex items-center">
            <img src="{{ asset('images/logo.png') }}" alt="Serene Logo" class="h-16 object-contain">
        </div>
        <h1 class="text-white text-[28px] font-normal tracking-wide absolute left-1/2 transform -translate-x-1/2 m-0 whitespace-nowrap">
            Welcome back Pemilik
        </h1>
        <div class="w-12 h-12 rounded-full overflow-hidden border-2 border-transparent">
            <img src="https://ui-avatars.com/api/?name=Pemilik&background=c27d42&color=fff" alt="Profile" class="w-full h-full object-cover">
        </div>
    </nav>

    <main class="max-w-[1100px] mx-auto pt-10 pb-12 px-6">
        
        <div class="flex justify-center mb-12">
            <div class="bg-[#a88669] rounded-full flex items-center p-1 shadow-sm overflow-hidden">
                <a href="{{ route('dashboard') }}" class="text-white px-8 py-2.5 rounded-full text-sm font-medium hover:bg-[#8e6e53] transition-colors">Home</a>
                <a href="{{ route('menu.index') }}" class="bg-[#3d2a1d] text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors">Daftar Menu</a>
                <a href="{{ route('membership.index') }}" class="text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#8e6e53] transition-colors">Daftar Membership</a>
                <a href="{{ route('karyawan.index') }}" class="text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#8e6e53] transition-colors">Daftar Karyawan</a>
                <a href="{{ route('keuangan.index') }}" class="text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#8e6e53] transition-colors">Pengeluaran Dan Pemasukan</a>
            </div>
        </div>

        <div class="flex justify-center mb-12">
            <button onclick="openAddModal()" class="bg-[#cd833c] text-white px-24 py-3.5 rounded-[14px] font-medium text-[22px] hover:bg-[#a86934] transition-colors shadow-sm tracking-wide">
                Tambah Menu
            </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            @foreach($menus as $menu)
            <div class="bg-[#f5eedc] rounded-[24px] p-6 shadow-sm flex flex-col justify-between h-full">
                
                <div class="flex items-center gap-5 mb-6">
                    <div class="w-24 h-24 rounded-full overflow-hidden bg-white shadow-inner flex-shrink-0">
                        <img 
                            src="{{ $menu->image ? asset('storage/' . $menu->image) : 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=200&auto=format&fit=crop' }}" 
                            alt="{{ $menu->name }}" 
                            class="w-full h-full object-cover"
                            onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=200&auto=format&fit=crop';"
                        >
                    </div>
                    <div>
                        <h3 class="text-[#3a2215] text-[22px] font-medium mb-1">{{ $menu->name }}</h3>
                        <p class="text-[#e2ce27] text-[18px] font-medium">Rp. {{ number_format($menu->price, 0, ',', '.') }}</p>
                    </div>
                </div>

                <div class="flex items-center gap-3 mt-auto">
                    <button 
                        onclick="openEditModal('{{ $menu->id }}', '{{ $menu->name }}', '{{ $menu->price }}', '{{ $menu->description }}', '{{ $menu->category_id }}')"
                        class="flex-1 bg-[#ffcc00] hover:bg-[#e6b800] text-white text-[15px] font-bold py-3 rounded-full transition-colors"
                    >
                        Ubah Menu
                    </button>
                    
                    <button class="w-[46px] h-[46px] bg-[#ff4b4b] hover:bg-[#e64343] text-white rounded-full flex items-center justify-center transition-colors flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>
            @endforeach

        </div>
    </main>

    <div id="editMenuModal" class="fixed inset-0 bg-black/60 flex justify-center items-center z-[9999] opacity-0 invisible transition-all duration-300">
        
        <div id="modalContent" class="bg-[#FDF6E3] p-10 md:p-14 rounded-[30px] w-[90%] max-w-[600px] shadow-2xl relative transform scale-95 transition-transform duration-300">
            
            <form id="editMenuForm" method="POST" action="">
                @csrf
                <input type="hidden" name="_method" id="method_spoof" value="POST">
                
                <input type="hidden" name="menu_id" id="modal_menu_id">

                <h2 id="modal_title" class="text-3xl font-bold text-center text-[#3a2215] mb-8">Tambah Menu Baru</h2>

                <div class="mb-5">
                    <label class="block mb-2 font-medium text-gray-800 ml-2">Nama Menu</label>
                    <input type="text" id="modal_nama_menu" name="name" class="w-full px-5 py-3.5 rounded-[15px] border border-[#DED1B8] bg-[#EFE1C9] text-gray-700 focus:outline-none focus:border-[#A8926D]" required>
                </div>

                <div class="mb-5">
                    <label class="block mb-2 font-medium text-gray-800 ml-2">Harga</label>
                    <input type="number" id="modal_harga" name="price" class="w-full px-5 py-3.5 rounded-[15px] border border-[#DED1B8] bg-[#EFE1C9] text-gray-700 focus:outline-none focus:border-[#A8926D]" required>
                </div>

                <div class="mb-5">
                    <label class="block mb-2 font-medium text-gray-800 ml-2">Deskripsi</label>
                    <input type="text" id="modal_deskripsi" name="description" class="w-full px-5 py-3.5 rounded-[15px] border border-[#DED1B8] bg-[#EFE1C9] text-gray-700 focus:outline-none focus:border-[#A8926D]">
                </div>

                <div class="mb-8">
                    <label class="block mb-2 font-medium text-gray-800 ml-2">Kategori</label>
                    <div class="relative">
                        <select id="modal_kategori" name="category_id" class="w-full pl-4 pr-10 py-3.5 rounded-[15px] border border-[#DED1B8] bg-[#EFE1C9] text-gray-700 focus:outline-none focus:border-[#A8926D] appearance-none cursor-pointer" required>
                            <option value="" disabled selected class="hidden">Pilih Kategori</option>
                            <option class="bg-white text-gray-800 py-2" value="1">Coffee</option>
                            <option class="bg-white text-gray-800 py-2" value="2">Non Coffee</option>
                            <option class="bg-white text-gray-800 py-2" value="3">Desserts</option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                            <svg class="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                            </svg>
                        </div>
                    </div>
                </div>

                <div class="flex justify-center gap-6">
                    <button type="button" onclick="closeModal()" class="bg-[#FF3D3D] hover:bg-[#E03535] text-white py-3 w-[200px] rounded-[15px] font-bold text-[18px] transition-colors">
                        Kembali
                    </button>
                    <button type="submit" class="bg-[#00FF00] hover:bg-[#00E000] text-white py-3 w-[200px] rounded-[15px] font-bold text-[18px] transition-colors">
                        Unggah
                    </button>
                </div>
            </form>
        </div>
    </div>

    <script>
        // FUNGSI BUAT TAMBAH MENU
        function openAddModal() {
            const modal = document.getElementById('editMenuModal');
            const modalContent = document.getElementById('modalContent');
            const form = document.getElementById('editMenuForm');

            document.getElementById('modal_title').innerText = "Tambah Menu Baru";
            document.getElementById('method_spoof').value = "POST";

            document.getElementById('modal_menu_id').value = '';
            document.getElementById('modal_nama_menu').value = '';
            document.getElementById('modal_harga').value = '';
            document.getElementById('modal_deskripsi').value = '';
            document.getElementById('modal_kategori').value = '';

            // 🚨 Hardcode URL biar aman dari bug encoding Laravel
            form.action = "/pemilik/menu/store";

            modal.classList.remove('opacity-0', 'invisible');
            modal.classList.add('opacity-100', 'visible');
            modalContent.classList.remove('scale-95');
            modalContent.classList.add('scale-100');

            document.body.style.overflow = 'hidden';
        }

        // FUNGSI BUAT UBAH MENU
        function openEditModal(id, name, price, desc, categoryId) {
            const modal = document.getElementById('editMenuModal');
            const modalContent = document.getElementById('modalContent');
            const form = document.getElementById('editMenuForm');
            
            document.getElementById('modal_title').innerText = "Ubah Data Menu";
            document.getElementById('method_spoof').value = "PUT";

            document.getElementById('modal_menu_id').value = id;
            document.getElementById('modal_nama_menu').value = name;
            document.getElementById('modal_harga').value = price;
            document.getElementById('modal_deskripsi').value = desc;
            document.getElementById('modal_kategori').value = categoryId;

            // 🚨 Hardcode URL biar aman dan langsung nyambung ke ID
            form.action = "/pemilik/menu/update/" + id;

            modal.classList.remove('opacity-0', 'invisible');
            modal.classList.add('opacity-100', 'visible');
            modalContent.classList.remove('scale-95');
            modalContent.classList.add('scale-100');

            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            const modal = document.getElementById('editMenuModal');
            const modalContent = document.getElementById('modalContent');
            
            modal.classList.remove('opacity-100', 'visible');
            modal.classList.add('opacity-0', 'invisible');
            modalContent.classList.remove('scale-100');
            modalContent.classList.add('scale-95');

            document.body.style.overflow = '';
        }

        window.onclick = function(event) {
            const modal = document.getElementById('editMenuModal');
            if (event.target === modal) {
                closeModal();
            }
        }
    </script>

</body>
</html>