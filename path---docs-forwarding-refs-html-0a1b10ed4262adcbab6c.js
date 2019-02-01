webpackJsonp([70370423703621],{891:function(n,s){n.exports={data:{markdownRemark:{html:'<p>引用传递是把<a href="/docs/refs-and-the-dom.html">引用</a>从组件传递到它的后代的方法.这种方法在<a href="/docs/higher-order-components.html">高阶组件</a>中特别有用.</p>\n<p>接下来我们举一个利用高阶组件打印组件属性到控制台的例子：\n<div class="gatsby-highlight">\n        <pre class="gatsby-code-jsx"><code><span class="gatsby-highlight-code-line"><span class="token keyword">function</span> <span class="token function">logProps</span><span class="token punctuation">(</span>WrappedComponent<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n</span>  <span class="token keyword">class</span> <span class="token class-name">LogProps</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>\n    <span class="token function">componentDidUpdate</span><span class="token punctuation">(</span>prevProps<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'old props:\'</span><span class="token punctuation">,</span> prevProps<span class="token punctuation">)</span><span class="token punctuation">;</span>\n      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'new props:\'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n<span class="gatsby-highlight-code-line">      <span class="token keyword">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>WrappedComponent</span> <span class="token spread"><span class="token punctuation">{</span><span class="token punctuation">...</span><span class="token attr-value">this</span><span class="token punctuation">.</span><span class="token attr-value">props</span><span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span><span class="token punctuation">;</span>\n</span>    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token keyword">return</span> LogProps<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre>\n        </div></p>\n<p>这个 “logProps”高阶组件把所有属性传递给它包装的组件，所以渲染后的结果将是一样的。例如，我们可以用这个高阶组件记录所有传递到我们的”fancy button” 组件：\n<div class="gatsby-highlight">\n        <pre class="gatsby-code-jsx"><code><span class="token keyword">class</span> <span class="token class-name">FancyButton</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>\n  <span class="token function">focus</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// ...</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token comment">// ...</span>\n<span class="token punctuation">}</span>\n\n<span class="token comment">// Rather than exporting FancyButton, we export LogProps.</span>\n<span class="token comment">// It will render a FancyButton though.</span>\n<span class="gatsby-highlight-code-line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">logProps</span><span class="token punctuation">(</span>FancyButton<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</span></code></pre>\n        </div></p>\n<p>上面的例子有个问题：refs属性不会被传递下去。因为<code class="gatsby-code-text">ref</code>不是一个属性。就像<code class="gatsby-code-text">key</code>,react用不一样的方式处理它们。\n如果你在高阶组件上添加ref属性，ref属性只会指向最外层的容器组件，而不是被包装的组件。</p>\n<p>这意味着我们想要ref关联到<code class="gatsby-code-text">FancyButton</code>组件，但实际上ref被关联到到<code class="gatsby-code-text">LogProps</code>组件：\n<div class="gatsby-highlight">\n        <pre class="gatsby-code-jsx"><code><span class="token keyword">import</span> FancyButton <span class="token keyword">from</span> <span class="token string">\'./FancyButton\'</span><span class="token punctuation">;</span>\n\n<span class="gatsby-highlight-code-line"><span class="token keyword">const</span> ref <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">createRef</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</span>\n<span class="token comment">// The FancyButton component we imported is the LogProps HOC.</span>\n<span class="token comment">// Even though the rendered output will be the same,</span>\n<span class="token comment">// Our ref will point to LogProps instead of the inner FancyButton component!</span>\n<span class="token comment">// This means we can\'t call e.g. ref.current.focus()</span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>FancyButton</span>\n  <span class="token attr-name">label</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>Click Me<span class="token punctuation">"</span></span>\n  <span class="token attr-name">handleClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>handleClick<span class="token punctuation">}</span></span>\n<span class="gatsby-highlight-code-line">  <span class="token attr-name">ref</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>ref<span class="token punctuation">}</span></span>\n</span><span class="token punctuation">/></span></span><span class="token punctuation">;</span>\n</code></pre>\n        </div></p>\n<p>幸运的是，我们可以通过使用<code class="gatsby-code-text">React.forwardRef</code>API指定指向内部<code class="gatsby-code-text">FancyButton</code>组件的引用.\n<code class="gatsby-code-text">React.forwardRef</code> 接收一个参数为<code class="gatsby-code-text">props</code>和<code class="gatsby-code-text">ref</code>并且返回类型是React节点的函数。例如：\n<div class="gatsby-highlight">\n        <pre class="gatsby-code-jsx"><code><span class="token keyword">function</span> <span class="token function">logProps</span><span class="token punctuation">(</span>Component<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">class</span> <span class="token class-name">LogProps</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>\n    <span class="token function">componentDidUpdate</span><span class="token punctuation">(</span>prevProps<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'old props:\'</span><span class="token punctuation">,</span> prevProps<span class="token punctuation">)</span><span class="token punctuation">;</span>\n      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'new props:\'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n<span class="gatsby-highlight-code-line">      <span class="token keyword">const</span> <span class="token punctuation">{</span>forwardedRef<span class="token punctuation">,</span> <span class="token operator">...</span>rest<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">;</span>\n</span>\n      <span class="token comment">// Assign the custom prop "forwardedRef" as a ref</span>\n<span class="gatsby-highlight-code-line">      <span class="token keyword">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Component</span> <span class="token attr-name">ref</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>forwardedRef<span class="token punctuation">}</span></span> <span class="token spread"><span class="token punctuation">{</span><span class="token punctuation">...</span><span class="token attr-value">rest</span><span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span><span class="token punctuation">;</span>\n</span>    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token comment">// Note the second param "ref" provided by React.forwardRef.</span>\n  <span class="token comment">// We can pass it along to LogProps as a regular prop, e.g. "forwardedRef"</span>\n  <span class="token comment">// And it can then be attached to the Component.</span>\n<span class="gatsby-highlight-code-line">  <span class="token keyword">function</span> <span class="token function">forwardRef</span><span class="token punctuation">(</span>props<span class="token punctuation">,</span> ref<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n</span><span class="gatsby-highlight-code-line">    <span class="token keyword">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>LogProps</span> <span class="token spread"><span class="token punctuation">{</span><span class="token punctuation">...</span><span class="token attr-value">props</span><span class="token punctuation">}</span></span> <span class="token attr-name">forwardedRef</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>ref<span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span><span class="token punctuation">;</span>\n</span><span class="gatsby-highlight-code-line">  <span class="token punctuation">}</span>\n</span>\n  <span class="token comment">// These next lines are not necessary,</span>\n  <span class="token comment">// But they do give the component a better display name in DevTools,</span>\n  <span class="token comment">// e.g. "ForwardRef(logProps(MyComponent))"</span>\n<span class="gatsby-highlight-code-line">  <span class="token keyword">const</span> name <span class="token operator">=</span> Component<span class="token punctuation">.</span>displayName <span class="token operator">||</span> Component<span class="token punctuation">.</span>name<span class="token punctuation">;</span>\n</span><span class="gatsby-highlight-code-line">  forwardRef<span class="token punctuation">.</span>displayName <span class="token operator">=</span> <span class="token template-string"><span class="token string">`logProps(</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">)`</span></span><span class="token punctuation">;</span>\n</span>\n  <span class="token keyword">return</span> React<span class="token punctuation">.</span><span class="token function">forwardRef</span><span class="token punctuation">(</span>forwardRef<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre>\n        </div></p>',frontmatter:{title:"Forwarding Refs",next:null,prev:null},fields:{path:"docs/forwarding-refs.md",slug:"docs/forwarding-refs.html"}}},pathContext:{slug:"docs/forwarding-refs.html"}}}});
//# sourceMappingURL=path---docs-forwarding-refs-html-0a1b10ed4262adcbab6c.js.map