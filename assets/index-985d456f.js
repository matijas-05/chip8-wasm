var Me=(A,h)=>()=>(h||A((h={exports:{}}).exports,h),h.exports);var Ue=Me((Pe,x)=>{(async()=>{(function(){const _=document.createElement("link").relList;if(_&&_.supports&&_.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))e(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&e(a)}).observe(document,{childList:!0,subtree:!0});function t(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function e(n){if(n.ep)return;n.ep=!0;const r=t(n);fetch(n.href,r)}})();const A="/chip8-wasm/assets/chip8_emulator_bg-2fcb6b1d.wasm",h=async(_={},t)=>{let e;if(t.startsWith("data:")){const n=t.replace(/^data:.*?base64,/,"");let r;if(typeof Buffer=="function"&&typeof Buffer.from=="function")r=Buffer.from(n,"base64");else if(typeof atob=="function"){const a=atob(n);r=new Uint8Array(a.length);for(let b=0;b<a.length;b++)r[b]=a.charCodeAt(b)}else throw new Error("Cannot decode base64-encoded data URL");e=await WebAssembly.instantiate(r,_)}else{const n=await fetch(t),r=n.headers.get("Content-Type")||"";if("instantiateStreaming"in WebAssembly&&r.startsWith("application/wasm"))e=await WebAssembly.instantiateStreaming(n,_);else{const a=await n.arrayBuffer();e=await WebAssembly.instantiate(a,_)}}return e.instance.exports};let i;function W(_){i=_}const d=new Array(128).fill(void 0);d.push(void 0,null,!0,!1);function c(_){return d[_]}let X=d.length;function L(_){_<132||(d[_]=X,X=_)}function B(_){const t=c(_);return L(_),t}const q=typeof TextDecoder>"u"?(0,x.require)("util").TextDecoder:TextDecoder;let O=new q("utf-8",{ignoreBOM:!0,fatal:!0});O.decode();let N=null;function p(){return(N===null||N.byteLength===0)&&(N=new Uint8Array(i.memory.buffer)),N}function f(_,t){return O.decode(p().subarray(_,_+t))}function s(_){X===d.length&&d.push(d.length+1);const t=X;return X=d[t],d[t]=_,t}let g=0;const D=typeof TextEncoder>"u"?(0,x.require)("util").TextEncoder:TextEncoder;let k=new D("utf-8");const M=typeof k.encodeInto=="function"?function(_,t){return k.encodeInto(_,t)}:function(_,t){const e=k.encode(_);return t.set(e),{read:_.length,written:e.length}};function y(_,t,e){if(e===void 0){const u=k.encode(_),m=t(u.length);return p().subarray(m,m+u.length).set(u),g=u.length,m}let n=_.length,r=t(n);const a=p();let b=0;for(;b<n;b++){const u=_.charCodeAt(b);if(u>127)break;a[r+b]=u}if(b!==n){b!==0&&(_=_.slice(b)),r=e(r,n,n=b+_.length*3);const u=p().subarray(r+b,r+n),m=M(_,u);b+=m.written}return g=b,r}function E(_){return _==null}let Y=null;function l(){return(Y===null||Y.byteLength===0)&&(Y=new Int32Array(i.memory.buffer)),Y}function I(_){const t=typeof _;if(t=="number"||t=="boolean"||_==null)return`${_}`;if(t=="string")return`"${_}"`;if(t=="symbol"){const r=_.description;return r==null?"Symbol":`Symbol(${r})`}if(t=="function"){const r=_.name;return typeof r=="string"&&r.length>0?`Function(${r})`:"Function"}if(Array.isArray(_)){const r=_.length;let a="[";r>0&&(a+=I(_[0]));for(let b=1;b<r;b++)a+=", "+I(_[b]);return a+="]",a}const e=/\[object ([^\]]+)\]/.exec(toString.call(_));let n;if(e.length>1)n=e[1];else return toString.call(_);if(n=="Object")try{return"Object("+JSON.stringify(_)+")"}catch{return"Object"}return _ instanceof Error?`${_.name}: ${_.message}
${_.stack}`:n}function U(_,t,e,n){const r={a:_,b:t,cnt:1,dtor:e},a=(...b)=>{r.cnt++;const u=r.a;r.a=0;try{return n(u,r.b,...b)}finally{--r.cnt===0?i.__wbindgen_export_2.get(r.dtor)(u,r.b):r.a=u}};return a.original=r,a}function $(_,t,e){i._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h7ca1a542a0f6edfd(_,t,s(e))}function P(_,t){const e=t(_.length*1);return p().set(_,e/1),g=_.length,e}function H(){i.init()}function V(_){const t=y(_,i.__wbindgen_malloc,i.__wbindgen_realloc),e=g;i.on_key_down(t,e)}function z(){i.on_key_up()}function w(_,t){try{return _.apply(this,t)}catch(e){i.__wbindgen_exn_store(s(e))}}function J(_,t){return p().subarray(_/1,_/1+t)}function K(_,t){i.wasm_bindgen__convert__closures__invoke0_mut__h3b459c23c96e50bc(_,t)}function G(_,t,e,n,r){i.wasm_bindgen__convert__closures__invoke3_mut__h0c9d9436fc8ecf76(_,t,s(e),n,s(r))}function Q(_,t,e,n){i.wasm_bindgen__convert__closures__invoke2_mut__h91be558819a8e05a(_,t,s(e),s(n))}class F{static __wrap(t){const e=Object.create(F.prototype);return e.ptr=t,e}__destroy_into_raw(){const t=this.ptr;return this.ptr=0,t}free(){const t=this.__destroy_into_raw();i.__wbg_emulator_free(t)}static init(t){const e=i.emulator_init(t);return F.__wrap(e)}load_rom(t){const e=P(t,i.__wbindgen_malloc),n=g;i.emulator_load_rom(this.ptr,e,n)}cycle(){i.emulator_cycle(this.ptr)}draw(){i.emulator_draw(this.ptr)}}function Z(_){B(_)}function __(_,t){const e=f(_,t);return s(e)}function t_(){return w(function(_,t,e){c(_).randomFillSync(J(t,e))},arguments)}function e_(){return w(function(_,t){c(_).getRandomValues(c(t))},arguments)}function n_(_){const t=c(_).crypto;return s(t)}function o_(_){const t=c(_);return typeof t=="object"&&t!==null}function r_(_){const t=c(_).process;return s(t)}function c_(_){const t=c(_).versions;return s(t)}function s_(_){const t=c(_).node;return s(t)}function i_(_){return typeof c(_)=="string"}function a_(_){const t=c(_).msCrypto;return s(t)}function b_(){return w(function(){const _=x.require;return s(_)},arguments)}function u_(_){return typeof c(_)=="function"}function w_(_){let t;try{t=c(_)instanceof Window}catch{t=!1}return t}function l_(_){const t=c(_).document;return E(t)?0:s(t)}function g_(){return w(function(_,t,e){const n=c(_).querySelector(f(t,e));return E(n)?0:s(n)},arguments)}function f_(_){let t;try{t=c(_)instanceof HTMLCanvasElement}catch{t=!1}return t}function d_(_,t){c(_).width=t>>>0}function m_(_,t){c(_).height=t>>>0}function y_(){return w(function(_,t,e){const n=c(_).getContext(f(t,e));return E(n)?0:s(n)},arguments)}function h_(){return w(function(){const _=new Audio;return s(_)},arguments)}function p_(_){console.debug(c(_))}function X_(_){console.error(c(_))}function v_(_){console.info(c(_))}function N_(_){console.log(c(_))}function k_(_){console.warn(c(_))}function E_(_){let t;try{t=c(_)instanceof CanvasRenderingContext2D}catch{t=!1}return t}function Y_(_,t){c(_).fillStyle=c(t)}function F_(_,t,e,n,r){c(_).fillRect(t,e,n,r)}function x_(_,t,e){c(_).src=f(t,e)}function A_(){return w(function(_){const t=c(_).play();return s(t)},arguments)}function I_(_,t){console.log(f(_,t))}function C_(_,t){const e=String(c(t)),n=y(e,i.__wbindgen_malloc,i.__wbindgen_realloc),r=g;l()[_/4+1]=r,l()[_/4+0]=n}function S_(_,t,e){const n=c(_).getElementById(f(t,e));return s(n)}function B_(_,t,e){c(_).textContent=f(t,e)}function O_(_,t){const e=c(t),n=typeof e=="string"?e:void 0;var r=E(n)?0:y(n,i.__wbindgen_malloc,i.__wbindgen_realloc),a=g;l()[_/4+1]=a,l()[_/4+0]=r}function j_(_){return s(_)}function T_(){return w(function(_,t){try{var e={a:_,b:t},n=()=>{const r=e.a;e.a=0;try{return K(r,e.b)}finally{e.a=r}};__wbg_test_invoke(n)}finally{e.a=e.b=0}},arguments)}function R_(){return s(document)}function W_(_,t){const e=c(t).textContent,n=y(e,i.__wbindgen_malloc,i.__wbindgen_realloc),r=g;l()[_/4+1]=r,l()[_/4+0]=n}function L_(_){const t=c(_);return s(t)}function q_(_){const t=c(_).stack;return s(t)}function D_(_,t){const e=c(t).stack,n=y(e,i.__wbindgen_malloc,i.__wbindgen_realloc),r=g;l()[_/4+1]=r,l()[_/4+0]=n}function M_(_){const t=c(_).self;return s(t)}function U_(_,t){return c(_)===c(t)}function $_(){const _=new Error;return s(_)}function P_(_,t){const e=c(t).stack,n=y(e,i.__wbindgen_malloc,i.__wbindgen_realloc),r=g;l()[_/4+1]=r,l()[_/4+0]=n}function H_(_,t){try{console.error(f(_,t))}finally{i.__wbindgen_free(_,t)}}function V_(_){const t=B(_).original;return t.cnt--==1?(t.a=0,!0):!1}function z_(_,t){const e=new Function(f(_,t));return s(e)}function J_(){return w(function(_,t){const e=c(_).call(c(t));return s(e)},arguments)}function K_(){return w(function(){const _=self.self;return s(_)},arguments)}function G_(){return w(function(){const _=window.window;return s(_)},arguments)}function Q_(){return w(function(){const _=globalThis.globalThis;return s(_)},arguments)}function Z_(){return w(function(){const _=global.global;return s(_)},arguments)}function _t(_){return c(_)===void 0}function tt(_,t,e){try{var n={a:t,b:e},r=(a,b,u)=>{const m=n.a;n.a=0;try{return G(m,n.b,a,b,u)}finally{n.a=m}};c(_).forEach(r)}finally{n.a=n.b=0}}function et(_){const t=c(_).message;return s(t)}function nt(_){const t=c(_).name;return s(t)}function ot(){return w(function(_,t,e){const n=c(_).call(c(t),c(e));return s(n)},arguments)}function rt(_,t){try{var e={a:_,b:t},n=(a,b)=>{const u=e.a;e.a=0;try{return Q(u,e.b,a,b)}finally{e.a=u}};const r=new Promise(n);return s(r)}finally{e.a=e.b=0}}function ct(_){const t=Promise.resolve(c(_));return s(t)}function st(_,t){const e=c(_).then(c(t));return s(e)}function it(_){const t=c(_).buffer;return s(t)}function at(_){const t=new Uint8Array(c(_));return s(t)}function bt(_,t,e){c(_).set(c(t),e>>>0)}function ut(_){return c(_).length}function wt(_){const t=new Uint8Array(_>>>0);return s(t)}function lt(_,t,e){const n=c(_).subarray(t>>>0,e>>>0);return s(n)}function gt(_,t){const e=I(c(t)),n=y(e,i.__wbindgen_malloc,i.__wbindgen_realloc),r=g;l()[_/4+1]=r,l()[_/4+0]=n}function ft(_,t){throw new Error(f(_,t))}function dt(){const _=i.memory;return s(_)}function mt(_,t,e){const n=U(_,t,276,$);return s(n)}URL=globalThis.URL;const o=await h({"./chip8_emulator_bg.js":{__wbindgen_object_drop_ref:Z,__wbindgen_string_new:__,__wbg_randomFillSync_6894564c2c334c42:t_,__wbg_getRandomValues_805f1c3d65988a5a:e_,__wbg_crypto_e1d53a1d73fb10b8:n_,__wbindgen_is_object:o_,__wbg_process_038c26bf42b093f8:r_,__wbg_versions_ab37218d2f0b24a8:c_,__wbg_node_080f4b19d15bc1fe:s_,__wbindgen_is_string:i_,__wbg_msCrypto_6e7d3e1f92610cbb:a_,__wbg_require_78a3dcfbdba9cbce:b_,__wbindgen_is_function:u_,__wbg_instanceof_Window_e266f02eee43b570:w_,__wbg_document_950215a728589a2d:l_,__wbg_querySelector_32b9d7ebb2df951d:g_,__wbg_instanceof_HtmlCanvasElement_f5f69dab93281ebe:f_,__wbg_setwidth_81c62bc806e0a727:d_,__wbg_setheight_98cf0db22c40ef07:m_,__wbg_getContext_3ae404b649cf9287:y_,__wbg_new_5697fae64ca6b4a5:h_,__wbg_debug_8db2eed1bf6c1e2a:p_,__wbg_error_fe807da27c4a4ced:X_,__wbg_info_9e6db45ac337c3b5:v_,__wbg_log_7bb108d119bafbc1:N_,__wbg_warn_e57696dbb3977030:k_,__wbg_instanceof_CanvasRenderingContext2d_3e95629461ed9f67:E_,__wbg_setfillStyle_b065cfad34a78974:Y_,__wbg_fillRect_f63ba845233f000a:F_,__wbg_setsrc_0d7be77b13a97bd2:x_,__wbg_play_6d9744c73137228c:A_,__wbg_log_06ce2db1f244c264:I_,__wbg_String_43e240bbca514dff:C_,__wbg_getElementById_21c1ba70eb74a26a:S_,__wbg_settextcontent_3c2a95e53849fa65:B_,__wbindgen_string_get:O_,__wbindgen_number_new:j_,__wbg_wbgtestinvoke_00cf1ac27b273033:T_,__wbg_static_accessor_document_c0babe68ba1eebc2:R_,__wbg_textcontent_82de0d7910ca2cb5:W_,__wbindgen_object_clone_ref:L_,__wbg_stack_e72a6800a9172afa:q_,__wbg_stack_67cc9e651682cbe5:D_,__wbg_self_ec4002dd45e47d74:M_,__wbindgen_jsval_eq:U_,__wbg_new_abda76e883ba8a5f:$_,__wbg_stack_658279fe44541cf6:P_,__wbg_error_f851667af71bcfc6:H_,__wbindgen_cb_drop:V_,__wbg_newnoargs_2b8b6bd7753c76ba:z_,__wbg_call_95d1ea488d03e4e8:J_,__wbg_self_e7c1f827057f6584:K_,__wbg_window_a09ec664e14b1b81:G_,__wbg_globalThis_87cbb8506fecf3a9:Q_,__wbg_global_c85a9259e621f3db:Z_,__wbindgen_is_undefined:_t,__wbg_forEach_c070c0d203ce2e51:tt,__wbg_message_a95c3ef248e4b57a:et,__wbg_name_c69a20c4b1197dc0:nt,__wbg_call_9495de66fdbe016b:ot,__wbg_new_9d3a9ce4282a18a8:rt,__wbg_resolve_fd40f858d9db1a04:ct,__wbg_then_ec5db6d509eb475f:st,__wbg_buffer_cf65c07de34b9a08:it,__wbg_new_537b7341ce90bb31:at,__wbg_set_17499e8aa4003ebd:bt,__wbg_length_27a2afe8ab42b09f:ut,__wbg_newwithlength_b56c882b57805732:wt,__wbg_subarray_7526649b91a252a6:lt,__wbindgen_debug_string:gt,__wbindgen_throw:ft,__wbindgen_memory:dt,__wbindgen_closure_wrapper900:mt}},A),yt=o.memory,ht=o.__wbgt_test_00E0_2,pt=o.__wbgt_test_00EE_3,Xt=o.__wbgt_test_1NNN_4,vt=o.__wbgt_test_2NNN_5,Nt=o.__wbgt_test_3XNN_6,kt=o.__wbgt_test_4XNN_7,Et=o.__wbgt_test_5XY0_8,Yt=o.__wbgt_test_6XNN_9,Ft=o.__wbgt_test_7XNN_10,xt=o.__wbgt_test_8XY0_11,At=o.__wbgt_test_8XY1_12,It=o.__wbgt_test_8XY2_13,Ct=o.__wbgt_test_8XY3_14,St=o.__wbgt_test_8XY4_no_overflow_15,Bt=o.__wbgt_test_8XY4_overflow_16,Ot=o.__wbgt_test_8XY5_no_underflow_17,jt=o.__wbgt_test_8XY5_underflow_18,Tt=o.__wbgt_test_8XY6_original_19,Rt=o.__wbgt_test_8XY6_new_20,Wt=o.__wbgt_test_8XY7_no_underflow_21,Lt=o.__wbgt_test_8XY7_underflow_22,qt=o.__wbgt_test_8XYE_original_23,Dt=o.__wbgt_test_8XYE_new_24,Mt=o.__wbgt_test_9XY0_25,Ut=o.__wbgt_test_ANNN_26,$t=o.__wbgt_test_BNNN_27,Pt=o.__wbgt_test_BXNN_28,Ht=o.__wbgt_test_CXNN_29,Vt=o.__wbgt_test_DXYN_no_flip_30,zt=o.__wbgt_test_DXYN_flip_31,Jt=o.__wbgt_test_EX9E_32,Kt=o.__wbgt_test_EXA1_wrong_key_33,Gt=o.__wbgt_test_EXA1_no_key_34,Qt=o.__wbgt_test_FX07_35,Zt=o.__wbgt_test_FX0A_36,_e=o.__wbgt_test_FX15_37,te=o.__wbgt_test_FX18_38,ee=o.__wbgt_test_FX1E_no_overflow_39,ne=o.__wbgt_test_FX1E_overflow_40,oe=o.__wbgt_test_FX29_41,re=o.__wbgt_test_FX33_42,ce=o.__wbgt_test_FX55_original_43,se=o.__wbgt_test_FX55_new_44,ie=o.__wbgt_test_FX65_original_45,ae=o.__wbgt_test_FX65_new_46,be=o.__wbg_emulator_free,ue=o.emulator_init,we=o.emulator_load_rom,le=o.emulator_cycle,ge=o.emulator_draw,fe=o.init,de=o.on_key_down,me=o.on_key_up,ye=o.__wbgt_test_load_fonts_0,he=o.__wbgt_test_load_rom_1,pe=o.__wbg_wasmbindgentestcontext_free,Xe=o.wasmbindgentestcontext_new,ve=o.wasmbindgentestcontext_args,Ne=o.wasmbindgentestcontext_run,ke=o.__wbgtest_console_log,Ee=o.__wbgtest_console_debug,Ye=o.__wbgtest_console_info,Fe=o.__wbgtest_console_warn,xe=o.__wbgtest_console_error,Ae=o.__wbindgen_malloc,Ie=o.__wbindgen_realloc,Ce=o.__wbindgen_export_2,Se=o._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h7ca1a542a0f6edfd,Be=o.__wbindgen_exn_store,Oe=o.wasm_bindgen__convert__closures__invoke0_mut__h3b459c23c96e50bc,je=o.__wbindgen_free,Te=o.wasm_bindgen__convert__closures__invoke3_mut__h0c9d9436fc8ecf76,Re=o.wasm_bindgen__convert__closures__invoke2_mut__h91be558819a8e05a,We=Object.freeze(Object.defineProperty({__proto__:null,__wbg_emulator_free:be,__wbg_wasmbindgentestcontext_free:pe,__wbgt_test_00E0_2:ht,__wbgt_test_00EE_3:pt,__wbgt_test_1NNN_4:Xt,__wbgt_test_2NNN_5:vt,__wbgt_test_3XNN_6:Nt,__wbgt_test_4XNN_7:kt,__wbgt_test_5XY0_8:Et,__wbgt_test_6XNN_9:Yt,__wbgt_test_7XNN_10:Ft,__wbgt_test_8XY0_11:xt,__wbgt_test_8XY1_12:At,__wbgt_test_8XY2_13:It,__wbgt_test_8XY3_14:Ct,__wbgt_test_8XY4_no_overflow_15:St,__wbgt_test_8XY4_overflow_16:Bt,__wbgt_test_8XY5_no_underflow_17:Ot,__wbgt_test_8XY5_underflow_18:jt,__wbgt_test_8XY6_new_20:Rt,__wbgt_test_8XY6_original_19:Tt,__wbgt_test_8XY7_no_underflow_21:Wt,__wbgt_test_8XY7_underflow_22:Lt,__wbgt_test_8XYE_new_24:Dt,__wbgt_test_8XYE_original_23:qt,__wbgt_test_9XY0_25:Mt,__wbgt_test_ANNN_26:Ut,__wbgt_test_BNNN_27:$t,__wbgt_test_BXNN_28:Pt,__wbgt_test_CXNN_29:Ht,__wbgt_test_DXYN_flip_31:zt,__wbgt_test_DXYN_no_flip_30:Vt,__wbgt_test_EX9E_32:Jt,__wbgt_test_EXA1_no_key_34:Gt,__wbgt_test_EXA1_wrong_key_33:Kt,__wbgt_test_FX07_35:Qt,__wbgt_test_FX0A_36:Zt,__wbgt_test_FX15_37:_e,__wbgt_test_FX18_38:te,__wbgt_test_FX1E_no_overflow_39:ee,__wbgt_test_FX1E_overflow_40:ne,__wbgt_test_FX29_41:oe,__wbgt_test_FX33_42:re,__wbgt_test_FX55_new_44:se,__wbgt_test_FX55_original_43:ce,__wbgt_test_FX65_new_46:ae,__wbgt_test_FX65_original_45:ie,__wbgt_test_load_fonts_0:ye,__wbgt_test_load_rom_1:he,__wbgtest_console_debug:Ee,__wbgtest_console_error:xe,__wbgtest_console_info:Ye,__wbgtest_console_log:ke,__wbgtest_console_warn:Fe,__wbindgen_exn_store:Be,__wbindgen_export_2:Ce,__wbindgen_free:je,__wbindgen_malloc:Ae,__wbindgen_realloc:Ie,_dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h7ca1a542a0f6edfd:Se,emulator_cycle:le,emulator_draw:ge,emulator_init:ue,emulator_load_rom:we,init:fe,memory:yt,on_key_down:de,on_key_up:me,wasm_bindgen__convert__closures__invoke0_mut__h3b459c23c96e50bc:Oe,wasm_bindgen__convert__closures__invoke2_mut__h91be558819a8e05a:Re,wasm_bindgen__convert__closures__invoke3_mut__h0c9d9436fc8ecf76:Te,wasmbindgentestcontext_args:ve,wasmbindgentestcontext_new:Xe,wasmbindgentestcontext_run:Ne},Symbol.toStringTag,{value:"Module"}));W(We),window._breakInterval={},window._setInterval=window.setInterval,window.setInterval=(_,t=.001,...e)=>{if(t>=10)return window._setInterval(_,t,...e);const n=.001;t<=0&&(t=n);const r=10/t,a=window._setInterval(()=>{for(let b=0;b<r;b++){if(window._breakInterval[a]){delete window._breakInterval[a];break}_(...e)}},10);return window._breakInterval[a]=!1,a},window._clearInterval=window.clearInterval,window.clearInterval=_=>{if(window._breakInterval[_]===void 0)return window._clearInterval(_);window._clearInterval(_),window._breakInterval[_]=!0};const Le=64,qe=32,j=10,T=document.querySelector("canvas");T.style.width=Le*j+"px",T.style.height=qe*j+"px",H(),document.onkeydown=_=>V(_.code),document.onkeyup=()=>z();const C=F.init(1),v=document.getElementById("rom");v.onchange=async()=>{v.blur(),await S()},document.getElementById("reload").onclick=async()=>await S(),await S(),setInterval(De,2),R();async function S(){if(v.value==="")return;const _=await(await fetch(`roms/${v.value}.ch8`)).arrayBuffer();C.load_rom(new Uint8Array(_))}function De(){v.value!==""&&C.cycle()}function R(){return C.draw(),requestAnimationFrame(R)}})()});export default Ue();