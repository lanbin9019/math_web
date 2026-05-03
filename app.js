
const MathCalculus = {
    formulas: {
        'matrix-addition': {
            title: '矩阵加法',
            category: 'linear-algebra',
            description: '矩阵加法是指两个对应维度相同的矩阵，将它们对应位置的元素相加得到新矩阵的运算。矩阵加法满足交换律和结合律。',
            formula: '$$A + B = \\begin{pmatrix} a_{11} & a_{12} \\\\ a_{21} & a_{22} \\end{pmatrix} + \\begin{pmatrix} b_{11} & b_{12} \\\\ b_{21} & b_{22} \\end{pmatrix} = \\begin{pmatrix} a_{11}+b_{11} & a_{12}+b_{12} \\\\ a_{21}+b_{21} & a_{22}+b_{22} \\end{pmatrix}$$',
            parameters: [
                { name: 'matrixSize', type: 'select', options: ['2x2', '3x3', '4x4'], label: '矩阵维度', default: '2x2' },
                { name: 'matrixA', type: 'matrix-simple', label: '矩阵 A' },
                { name: 'matrixB', type: 'matrix-simple', label: '矩阵 B' }
            ],
            calculate: function(params) {
                const size = parseInt(params.matrixSize.split('x')[0]);
                const steps = [];
                const result = [];
                
                steps.push('**步骤 1：验证矩阵维度**');
                steps.push(`两个矩阵的维度均为 ${size}×${size}，满足加法条件（维度必须相同）。`);
                
                steps.push('**步骤 2：对应元素相加**');
                for (let i = 0; i < size; i++) {
                    const row = [];
                    const rowSteps = [];
                    for (let j = 0; j < size; j++) {
                        const a = parseFloat(params.matrixA[i][j]) || 0;
                        const b = parseFloat(params.matrixB[i][j]) || 0;
                        const sum = a + b;
                        row.push(sum);
                        rowSteps.push(`元素 [${i+1}][${j+1}]: ${a} + ${b} = ${sum}`);
                    }
                    result.push(row);
                    steps.push(`第 ${i+1} 行：${rowSteps.join('，')}`);
                }
                
                steps.push('**步骤 3：构建结果矩阵**');
                
                return {
                    result: result,
                    steps: steps,
                    latex: MathCalculus.matrixToLatex(result)
                };
            },
            visualize: function(result, params) {
                const size = parseInt(params.matrixSize.split('x')[0]);
                
                const xValues = [];
                const yValues = [];
                for (let i = 0; i < size; i++) {
                    xValues.push(i + 1);
                    yValues.push(size - i);
                }
                
                const trace = {
                    z: result,
                    x: xValues,
                    y: yValues,
                    type: 'heatmap',
                    colorscale: 'Viridis',
                    showscale: true,
                    name: '结果矩阵'
                };
                
                const annotations = [];
                for (let i = 0; i < size; i++) {
                    for (let j = 0; j < size; j++) {
                        annotations.push({
                            x: j + 1,
                            y: size - i,
                            text: result[i][j].toString(),
                            showarrow: false,
                            font: { color: 'white', size: 14 }
                        });
                    }
                }
                
                const layout = {
                    title: '矩阵加法结果热力图',
                    xaxis: { title: '列索引', dtick: 1 },
                    yaxis: { title: '行索引', dtick: 1 },
                    annotations: annotations,
                    showlegend: true
                };
                
                return { data: [trace], layout: layout };
            }
        },
        
        'matrix-multiplication': {
            title: '矩阵乘法',
            category: 'linear-algebra',
            description: '矩阵乘法是指第一个矩阵的行与第二个矩阵的列对应元素相乘后求和，得到结果矩阵的元素。注意：矩阵乘法不满足交换律。',
            formula: '$$C = A \\times B = \\begin{pmatrix} \\sum_{k=1}^n a_{1k}b_{k1} & \\sum_{k=1}^n a_{1k}b_{k2} \\\\ \\sum_{k=1}^n a_{2k}b_{k1} & \\sum_{k=1}^n a_{2k}b_{k2} \\end{pmatrix}$$',
            parameters: [
                { name: 'matrixSize', type: 'select', options: ['2x2', '3x3'], label: '矩阵维度', default: '2x2' },
                { name: 'matrixA', type: 'matrix-simple', label: '矩阵 A' },
                { name: 'matrixB', type: 'matrix-simple', label: '矩阵 B' }
            ],
            calculate: function(params) {
                const size = parseInt(params.matrixSize.split('x')[0]);
                const steps = [];
                const result = [];
                
                steps.push('**步骤 1：验证矩阵维度**');
                steps.push(`矩阵 A 和矩阵 B 均为 ${size}×${size} 矩阵，满足乘法条件（A的列数=B的行数）。`);
                
                steps.push('**步骤 2：计算每个元素**');
                for (let i = 0; i < size; i++) {
                    const row = [];
                    for (let j = 0; j < size; j++) {
                        let sum = 0;
                        const elementSteps = [];
                        for (let k = 0; k < size; k++) {
                            const a = parseFloat(params.matrixA[i][k]) || 0;
                            const b = parseFloat(params.matrixB[k][j]) || 0;
                            const product = a * b;
                            sum += product;
                            elementSteps.push(`${a}×${b}`);
                        }
                        row.push(sum);
                        steps.push(`元素 [${i+1}][${j+1}]: ${elementSteps.join(' + ')} = ${sum}`);
                    }
                    result.push(row);
                }
                
                steps.push('**步骤 3：构建结果矩阵**');
                
                return {
                    result: result,
                    steps: steps,
                    latex: MathCalculus.matrixToLatex(result)
                };
            },
            visualize: function(result, params) {
                const size = parseInt(params.matrixSize.split('x')[0]);
                
                const xValues = [];
                const yValues = [];
                for (let i = 0; i < size; i++) {
                    xValues.push(i + 1);
                    yValues.push(size - i);
                }
                
                const trace = {
                    z: result,
                    x: xValues,
                    y: yValues,
                    type: 'heatmap',
                    colorscale: 'Plasma',
                    showscale: true,
                    name: '结果矩阵'
                };
                
                const annotations = [];
                for (let i = 0; i < size; i++) {
                    for (let j = 0; j < size; j++) {
                        annotations.push({
                            x: j + 1,
                            y: size - i,
                            text: result[i][j].toString(),
                            showarrow: false,
                            font: { color: 'white', size: 14 }
                        });
                    }
                }
                
                const layout = {
                    title: '矩阵乘法结果热力图',
                    xaxis: { title: '列索引', dtick: 1 },
                    yaxis: { title: '行索引', dtick: 1 },
                    annotations: annotations,
                    showlegend: true
                };
                
                return { data: [trace], layout: layout };
            }
        },
        
        'matrix-determinant': {
            title: '行列式计算',
            category: 'linear-algebra',
            description: '行列式是一个与方阵相关的标量值，可以用来判断矩阵是否可逆。对于2阶矩阵，行列式是对角线元素之差；对于高阶矩阵，使用代数余子式展开计算。',
            formula: '$$\\det(A) = \\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix} = ad - bc$$',
            formula2: '$$\\det(A) = \\begin{vmatrix} a & b & c \\\\ d & e & f \\\\ g & h & i \\end{vmatrix} = a(ei-fh) - b(di-fg) + c(dh-eg)$$',
            parameters: [
                { name: 'matrixSize', type: 'select', options: ['2x2', '3x3'], label: '矩阵维度', default: '2x2' },
                { name: 'matrixA', type: 'matrix-simple', label: '矩阵 A' }
            ],
            calculate: function(params) {
                const size = parseInt(params.matrixSize.split('x')[0]);
                const steps = [];
                const matrix = params.matrixA.map(row => row.map(v => parseFloat(v) || 0));
                
                steps.push('**步骤 1：确认矩阵为方阵**');
                steps.push(`矩阵为 ${size}×${size} 方阵，可以计算行列式。`);
                
                let result;
                
                if (size === 2) {
                    steps.push('**步骤 2：使用2阶行列式公式**');
                    const a = matrix[0][0], b = matrix[0][1];
                    const c = matrix[1][0], d = matrix[1][1];
                    steps.push(`det(A) = ${a}×${d} - ${b}×${c}`);
                    result = a * d - b * c;
                    steps.push(`det(A) = ${a*d} - ${b*c} = ${result}`);
                } else {
                    steps.push('**步骤 2：使用代数余子式展开（按第一行）**');
                    const a = matrix[0][0], b = matrix[0][1], c = matrix[0][2];
                    const d = matrix[1][0], e = matrix[1][1], f = matrix[1][2];
                    const g = matrix[2][0], h = matrix[2][1], i = matrix[2][2];
                    
                    steps.push(`det(A) = ${a}×det([[${e},${f}],[${h},${i}]]) - ${b}×det([[${d},${f}],[${g},${i}]]) + ${c}×det([[${d},${e}],[${g},${h}]])`);
                    
                    const det1 = e * i - f * h;
                    const det2 = d * i - f * g;
                    const det3 = d * h - e * g;
                    
                    steps.push(`计算各2阶行列式：`);
                    steps.push(`det1 = ${e}×${i} - ${f}×${h} = ${det1}`);
                    steps.push(`det2 = ${d}×${i} - ${f}×${g} = ${det2}`);
                    steps.push(`det3 = ${d}×${h} - ${e}×${g} = ${det3}`);
                    
                    result = a * det1 - b * det2 + c * det3;
                    steps.push(`det(A) = ${a}×${det1} - ${b}×${det2} + ${c}×${det3} = ${result}`);
                }
                
                steps.push('**步骤 3：结果分析**');
                if (result === 0) {
                    steps.push('行列式为 0，矩阵不可逆（奇异矩阵）。');
                } else {
                    steps.push(`行列式为 ${result}，矩阵可逆，逆矩阵存在。`);
                }
                
                return {
                    result: result,
                    steps: steps,
                    latex: `\\det(A) = ${result}`
                };
            },
            visualize: function(result, params) {
                const size = parseInt(params.matrixSize.split('x')[0]);
                const matrix = params.matrixA.map(row => row.map(v => parseFloat(v) || 0));
                
                const xValues = [];
                const yValues = [];
                for (let i = 0; i < size; i++) {
                    xValues.push(i + 1);
                    yValues.push(size - i);
                }
                
                const trace = {
                    z: matrix,
                    x: xValues,
                    y: yValues,
                    type: 'heatmap',
                    colorscale: 'Cividis',
                    showscale: true,
                    name: '原矩阵'
                };
                
                const annotations = [];
                for (let i = 0; i < size; i++) {
                    for (let j = 0; j < size; j++) {
                        annotations.push({
                            x: j + 1,
                            y: size - i,
                            text: matrix[i][j].toString(),
                            showarrow: false,
                            font: { color: 'white', size: 14 }
                        });
                    }
                }
                
                const layout = {
                    title: `原矩阵热力图（行列式 = ${result}）`,
                    xaxis: { title: '列索引', dtick: 1 },
                    yaxis: { title: '行索引', dtick: 1 },
                    annotations: annotations,
                    showlegend: true
                };
                
                return { data: [trace], layout: layout };
            }
        },
        
        'matrix-inverse': {
            title: '矩阵求逆',
            category: 'linear-algebra',
            description: '矩阵的逆矩阵是指与原矩阵相乘得到单位矩阵的矩阵。对于2阶矩阵，逆矩阵为伴随矩阵除以行列式；对于高阶矩阵，使用初等行变换或伴随矩阵法计算。',
            formula: '$$A^{-1} = \\frac{1}{\\det(A)} \\text{adj}(A) = \\frac{1}{ad-bc} \\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}$$',
            parameters: [
                { name: 'matrixSize', type: 'select', options: ['2x2'], label: '矩阵维度', default: '2x2' },
                { name: 'matrixA', type: 'matrix-simple', label: '矩阵 A' }
            ],
            calculate: function(params) {
                const matrix = params.matrixA.map(row => row.map(v => parseFloat(v) || 0));
                const steps = [];
                
                steps.push('**步骤 1：计算行列式**');
                const a = matrix[0][0], b = matrix[0][1];
                const c = matrix[1][0], d = matrix[1][1];
                const det = a * d - b * c;
                
                steps.push(`det(A) = ${a}×${d} - ${b}×${c} = ${det}`);
                
                if (det === 0) {
                    steps.push('**错误：行列式为 0，矩阵不可逆**');
                    return {
                        result: null,
                        steps: steps,
                        error: '矩阵不可逆（行列式为0）'
                    };
                }
                
                steps.push('**步骤 2：计算伴随矩阵**');
                steps.push('伴随矩阵是代数余子式矩阵的转置：');
                steps.push(`C = \\begin{pmatrix} ${d} & ${-c} \\\\ ${-b} & ${a} \\end{pmatrix}`);
                steps.push(`adj(A) = C^T = \\begin{pmatrix} ${d} & ${-b} \\\\ ${-c} & ${a} \\end{pmatrix}`);
                
                steps.push('**步骤 3：计算逆矩阵**');
                steps.push(`A^{-1} = \\frac{1}{${det}} × adj(A)`);
                
                const result = [
                    [d / det, -b / det],
                    [-c / det, a / det]
                ];
                
                steps.push(`A^{-1} = \\begin{pmatrix} ${result[0][0].toFixed(4)} & ${result[0][1].toFixed(4)} \\\\ ${result[1][0].toFixed(4)} & ${result[1][1].toFixed(4)} \\end{pmatrix}`);
                
                steps.push('**步骤 4：验证**');
                steps.push('可以验证 A × A⁻¹ = I（单位矩阵）');
                
                return {
                    result: result,
                    steps: steps,
                    latex: MathCalculus.matrixToLatex(result)
                };
            },
            visualize: function(result, params) {
                const matrix = params.matrixA.map(row => row.map(v => parseFloat(v) || 0));
                const size = matrix.length;
                
                const xValues = [];
                const yValues = [];
                for (let i = 0; i < size; i++) {
                    xValues.push(i + 1);
                    yValues.push(size - i);
                }
                
                const trace1 = {
                    z: matrix,
                    x: xValues,
                    y: yValues,
                    type: 'heatmap',
                    colorscale: 'Viridis',
                    showscale: true,
                    name: '原矩阵'
                };
                
                const trace2 = {
                    z: result,
                    x: xValues.map(v => v + size + 1),
                    y: yValues,
                    type: 'heatmap',
                    colorscale: 'Plasma',
                    showscale: true,
                    name: '逆矩阵'
                };
                
                const annotations = [];
                for (let i = 0; i < size; i++) {
                    for (let j = 0; j < size; j++) {
                        annotations.push({
                            x: j + 1,
                            y: size - i,
                            text: matrix[i][j].toFixed(2),
                            showarrow: false,
                            font: { color: 'white', size: 14 }
                        });
                        annotations.push({
                            x: j + size + 2,
                            y: size - i,
                            text: result[i][j].toFixed(4),
                            showarrow: false,
                            font: { color: 'white', size: 14 }
                        });
                    }
                }
                
                const layout = {
                    title: '原矩阵（左）与逆矩阵（右）',
                    xaxis: { 
                        title: '',
                        tickvals: xValues.concat(xValues.map(v => v + size + 1)),
                        ticktext: xValues.map((v, i) => `原${v}`).concat(xValues.map((v, i) => `逆${v}`))
                    },
                    yaxis: { title: '行索引', dtick: 1 },
                    annotations: annotations,
                    showlegend: true
                };
                
                return { data: [trace1, trace2], layout: layout };
            }
        },
        
        'matrix-transpose': {
            title: '矩阵转置',
            category: 'linear-algebra',
            description: '矩阵转置是指将矩阵的行和列互换得到的新矩阵。转置操作在矩阵运算中非常重要，具有许多重要性质。',
            formula: '$$A^T = \\begin{pmatrix} a & b \\\\ c & d \\\\ e & f \\end{pmatrix}^T = \\begin{pmatrix} a & c & e \\\\ b & d & f \\end{pmatrix}$$',
            parameters: [
                { name: 'matrixSize', type: 'select', options: ['2x2', '3x3'], label: '矩阵维度', default: '2x2' },
                { name: 'matrixA', type: 'matrix-simple', label: '矩阵 A' }
            ],
            calculate: function(params) {
                const size = parseInt(params.matrixSize.split('x')[0]);
                const matrix = params.matrixA.map(row => row.map(v => parseFloat(v) || 0));
                const steps = [];
                
                steps.push('**步骤 1：理解转置的定义**');
                steps.push('矩阵转置是将原矩阵的行变为列，列变为行。');
                steps.push('即 A^T[i][j] = A[j][i]');
                
                steps.push('**步骤 2：逐个元素转置**');
                const result = [];
                for (let j = 0; j < size; j++) {
                    const row = [];
                    const rowSteps = [];
                    for (let i = 0; i < size; i++) {
                        const val = matrix[i][j];
                        row.push(val);
                        rowSteps.push(`A^T[${j+1}][${i+1}] = A[${i+1}][${j+1}] = ${val}`);
                    }
                    result.push(row);
                    steps.push(`第 ${j+1} 行：${rowSteps.join('，')}`);
                }
                
                steps.push('**步骤 3：构建转置矩阵**');
                
                return {
                    result: result,
                    steps: steps,
                    latex: MathCalculus.matrixToLatex(result)
                };
            },
            visualize: function(result, params) {
                const size = parseInt(params.matrixSize.split('x')[0]);
                const matrix = params.matrixA.map(row => row.map(v => parseFloat(v) || 0));
                
                const xValues = [];
                const yValues = [];
                for (let i = 0; i < size; i++) {
                    xValues.push(i + 1);
                    yValues.push(size - i);
                }
                
                const trace1 = {
                    z: matrix,
                    x: xValues,
                    y: yValues,
                    type: 'heatmap',
                    colorscale: 'Viridis',
                    showscale: true,
                    name: '原矩阵'
                };
                
                const trace2 = {
                    z: result,
                    x: xValues.map(v => v + size + 1),
                    y: yValues,
                    type: 'heatmap',
                    colorscale: 'Plasma',
                    showscale: true,
                    name: '转置矩阵'
                };
                
                const annotations = [];
                for (let i = 0; i < size; i++) {
                    for (let j = 0; j < size; j++) {
                        annotations.push({
                            x: j + 1,
                            y: size - i,
                            text: matrix[i][j].toString(),
                            showarrow: false,
                            font: { color: 'white', size: 14 }
                        });
                        annotations.push({
                            x: j + size + 2,
                            y: size - i,
                            text: result[i][j].toString(),
                            showarrow: false,
                            font: { color: 'white', size: 14 }
                        });
                    }
                }
                
                const layout = {
                    title: '原矩阵（左）与转置矩阵（右）',
                    xaxis: { 
                        title: '',
                        tickvals: xValues.concat(xValues.map(v => v + size + 1)),
                        ticktext: xValues.map((v, i) => `原${v}`).concat(xValues.map((v, i) => `转${v}`))
                    },
                    yaxis: { title: '行索引', dtick: 1 },
                    annotations: annotations,
                    showlegend: true
                };
                
                return { data: [trace1, trace2], layout: layout };
            }
        },
        
        'eigenvalues': {
            title: '特征值与特征向量',
            category: 'linear-algebra',
            description: '特征值和特征向量是线性代数中的重要概念。对于矩阵A，如果存在非零向量v和标量λ，使得Av=λv，则λ称为特征值，v称为对应的特征向量。',
            formula: '$$A\\mathbf{v} = \\lambda \\mathbf{v}$$',
            formula2: '$$\\det(A - \\lambda I) = 0$$',
            parameters: [
                { name: 'matrixSize', type: 'select', options: ['2x2'], label: '矩阵维度', default: '2x2' },
                { name: 'matrixA', type: 'matrix-simple', label: '矩阵 A' }
            ],
            calculate: function(params) {
                const matrix = params.matrixA.map(row => row.map(v => parseFloat(v) || 0));
                const a = matrix[0][0], b = matrix[0][1];
                const c = matrix[1][0], d = matrix[1][1];
                const steps = [];
                
                steps.push('**步骤 1：构建特征方程**');
                steps.push('特征方程为 det(A - λI) = 0');
                steps.push(`A - λI = \\begin{pmatrix} ${a}-λ & ${b} \\\\ ${c} & ${d}-λ \\end{pmatrix}`);
                
                steps.push('**步骤 2：展开特征方程**');
                const trace = a + d;
                const det = a * d - b * c;
                steps.push(`det(A - λI) = (${a}-λ)(${d}-λ) - (${b})(${c}) = 0`);
                steps.push(`λ² - (${a}+${d})λ + (${a}×${d} - ${b}×${c}) = 0`);
                steps.push(`λ² - ${trace}λ + ${det} = 0`);
                
                steps.push('**步骤 3：解二次方程求特征值**');
                const discriminant = trace * trace - 4 * det;
                steps.push(`判别式 Δ = ${trace}² - 4×${det} = ${discriminant}`);
                
                let eigenvalues;
                if (discriminant >= 0) {
                    const sqrtDisc = Math.sqrt(discriminant);
                    eigenvalues = [
                        (trace + sqrtDisc) / 2,
                        (trace - sqrtDisc) / 2
                    ];
                    steps.push(`λ₁ = (${trace} + √${discriminant}) / 2 = ${eigenvalues[0].toFixed(4)}`);
                    steps.push(`λ₂ = (${trace} - √${discriminant}) / 2 = ${eigenvalues[1].toFixed(4)}`);
                } else {
                    const realPart = trace / 2;
                    const imagPart = Math.sqrt(-discriminant) / 2;
                    eigenvalues = [`${realPart.toFixed(4)} + ${imagPart.toFixed(4)}i`, `${realPart.toFixed(4)} - ${imagPart.toFixed(4)}i`];
                    steps.push('特征值为复数：');
                    steps.push(`λ₁ = ${realPart.toFixed(4)} + ${imagPart.toFixed(4)}i`);
                    steps.push(`λ₂ = ${realPart.toFixed(4)} - ${imagPart.toFixed(4)}i`);
                }
                
                steps.push('**步骤 4：求特征向量（以实数特征值为例）**');
                if (discriminant >= 0) {
                    steps.push('对于每个特征值λ，解 (A - λI)v = 0');
                    steps.push('特征向量方向取决于矩阵结构。');
                }
                
                return {
                    result: { eigenvalues: eigenvalues, discriminant: discriminant },
                    steps: steps,
                    latex: `\\lambda_1 = ${eigenvalues[0]}, \\lambda_2 = ${eigenvalues[1]}`
                };
            },
            visualize: function(result, params) {
                const matrix = params.matrixA.map(row => row.map(v => parseFloat(v) || 0));
                const size = matrix.length;
                const a = matrix[0][0], b = matrix[0][1];
                const c = matrix[1][0], d = matrix[1][1];
                
                const xValues = [];
                const yValues = [];
                for (let i = 0; i < size; i++) {
                    xValues.push(i + 1);
                    yValues.push(size - i);
                }
                
                const trace = {
                    z: matrix,
                    x: xValues,
                    y: yValues,
                    type: 'heatmap',
                    colorscale: 'Viridis',
                    showscale: true,
                    name: '原矩阵'
                };
                
                const annotations = [];
                for (let i = 0; i < size; i++) {
                    for (let j = 0; j < size; j++) {
                        annotations.push({
                            x: j + 1,
                            y: size - i,
                            text: matrix[i][j].toString(),
                            showarrow: false,
                            font: { color: 'white', size: 16 }
                        });
                    }
                }
                
                const layout = {
                    title: `矩阵热力图（迹 = ${a+d}, 行列式 = ${a*d - b*c}）`,
                    xaxis: { title: '列索引', dtick: 1 },
                    yaxis: { title: '行索引', dtick: 1 },
                    annotations: annotations,
                    showlegend: true
                };
                
                return { data: [trace], layout: layout };
            }
        },
        
        'vector-dot': {
            title: '向量点积',
            category: 'linear-algebra',
            description: '向量点积（内积）是两个向量对应分量相乘后求和的结果。点积结果是一个标量，可以用来计算两个向量的夹角和投影。',
            formula: '$$\\mathbf{a} \\cdot \\mathbf{b} = a_1b_1 + a_2b_2 + a_3b_3 = |\\mathbf{a}||\\mathbf{b}|\\cos\\theta$$',
            parameters: [
                { name: 'vectorSize', type: 'select', options: ['2维', '3维'], label: '向量维度', default: '3维' },
                { name: 'vectorA', type: 'vector', label: '向量 a' },
                { name: 'vectorB', type: 'vector', label: '向量 b' }
            ],
            calculate: function(params) {
                const size = params.vectorSize === '2维' ? 2 : 3;
                const vecA = params.vectorA.map(v => parseFloat(v) || 0);
                const vecB = params.vectorB.map(v => parseFloat(v) || 0);
                const steps = [];
                
                steps.push('**步骤 1：写出向量分量**');
                if (size === 3) {
                    steps.push(`a = (${vecA[0]}, ${vecA[1]}, ${vecA[2]})`);
                    steps.push(`b = (${vecB[0]}, ${vecB[1]}, ${vecB[2]})`);
                } else {
                    steps.push(`a = (${vecA[0]}, ${vecA[1]})`);
                    steps.push(`b = (${vecB[0]}, ${vecB[1]})`);
                }
                
                steps.push('**步骤 2：计算点积**');
                const products = [];
                let result = 0;
                for (let i = 0; i < size; i++) {
                    const product = vecA[i] * vecB[i];
                    products.push(`${vecA[i]}×${vecB[i]}`);
                    result += product;
                }
                
                steps.push(`a·b = ${products.join(' + ')} = ${result}`);
                
                steps.push('**步骤 3：计算向量模长**');
                const normA = Math.sqrt(vecA.reduce((sum, v) => sum + v * v, 0));
                const normB = Math.sqrt(vecB.reduce((sum, v) => sum + v * v, 0));
                steps.push(`|a| = √(${vecA.map(v => v + '²').join(' + ')}) = ${normA.toFixed(4)}`);
                steps.push(`|b| = √(${vecB.map(v => v + '²').join(' + ')}) = ${normB.toFixed(4)}`);
                
                steps.push('**步骤 4：计算夹角**');
                if (normA > 0 && normB > 0) {
                    const cosTheta = result / (normA * normB);
                    const clampedCosTheta = Math.max(-1, Math.min(1, cosTheta));
                    const theta = Math.acos(clampedCosTheta);
                    const thetaDeg = theta * 180 / Math.PI;
                    steps.push(`cosθ = ${result} / (${normA.toFixed(4)}×${normB.toFixed(4)}) = ${cosTheta.toFixed(4)}`);
                    steps.push(`θ = ${theta.toFixed(4)} 弧度 = ${thetaDeg.toFixed(2)}°`);
                    
                    if (Math.abs(clampedCosTheta - 1) < 1e-6) {
                        steps.push('向量同向（θ=0°）');
                    } else if (Math.abs(clampedCosTheta + 1) < 1e-6) {
                        steps.push('向量反向（θ=180°）');
                    } else if (Math.abs(clampedCosTheta) < 1e-6) {
                        steps.push('向量正交（垂直，θ=90°）');
                    }
                }
                
                return {
                    result: result,
                    steps: steps,
                    latex: `\\mathbf{a} \\cdot \\mathbf{b} = ${result}`
                };
            },
            visualize: function(result, params) {
                const size = params.vectorSize === '2维' ? 2 : 3;
                const vecA = params.vectorA.map(v => parseFloat(v) || 0);
                const vecB = params.vectorB.map(v => parseFloat(v) || 0);
                
                if (size === 2) {
                    const trace1 = {
                        x: [0, vecA[0]],
                        y: [0, vecA[1]],
                        type: 'scatter',
                        mode: 'lines+markers',
                        name: '向量 a',
                        line: { color: 'blue', width: 3 },
                        marker: { size: 8 }
                    };
                    
                    const trace2 = {
                        x: [0, vecB[0]],
                        y: [0, vecB[1]],
                        type: 'scatter',
                        mode: 'lines+markers',
                        name: '向量 b',
                        line: { color: 'red', width: 3 },
                        marker: { size: 8 }
                    };
                    
                    const layout = {
                        title: `向量点积 = ${result}`,
                        xaxis: { title: 'x', zeroline: true },
                        yaxis: { title: 'y', zeroline: true, scaleanchor: 'x' },
                        showlegend: true,
                        annotations: [
                            { x: vecA[0]/2, y: vecA[1]/2, text: 'a', showarrow: false, font: { color: 'blue', size: 14 } },
                            { x: vecB[0]/2, y: vecB[1]/2, text: 'b', showarrow: false, font: { color: 'red', size: 14 } }
                        ]
                    };
                    
                    return { data: [trace1, trace2], layout: layout };
                } else {
                    const trace1 = {
                        x: [0, vecA[0]],
                        y: [0, vecA[1]],
                        z: [0, vecA[2]],
                        type: 'scatter3d',
                        mode: 'lines+markers',
                        name: '向量 a',
                        line: { color: 'blue', width: 5 },
                        marker: { size: 4 }
                    };
                    
                    const trace2 = {
                        x: [0, vecB[0]],
                        y: [0, vecB[1]],
                        z: [0, vecB[2]],
                        type: 'scatter3d',
                        mode: 'lines+markers',
                        name: '向量 b',
                        line: { color: 'red', width: 5 },
                        marker: { size: 4 }
                    };
                    
                    const layout = {
                        title: `向量点积 = ${result}`,
                        scene: {
                            xaxis: { title: 'x' },
                            yaxis: { title: 'y' },
                            zaxis: { title: 'z' }
                        },
                        showlegend: true
                    };
                    
                    return { data: [trace1, trace2], layout: layout };
                }
            }
        },
        
        'vector-cross': {
            title: '向量叉积',
            category: 'linear-algebra',
            description: '向量叉积（外积）是在三维空间中定义的，结果是一个与两个原向量都垂直的新向量。叉积的模长等于两个向量构成的平行四边形的面积。',
            formula: '$$\\mathbf{a} \\times \\mathbf{b} = \\begin{vmatrix} \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ a_1 & a_2 & a_3 \\\\ b_1 & b_2 & b_3 \\end{vmatrix} = (a_2b_3 - a_3b_2)\\mathbf{i} + (a_3b_1 - a_1b_3)\\mathbf{j} + (a_1b_2 - a_2b_1)\\mathbf{k}$$',
            parameters: [
                { name: 'vectorA', type: 'vector3d', label: '向量 a' },
                { name: 'vectorB', type: 'vector3d', label: '向量 b' }
            ],
            calculate: function(params) {
                const vecA = params.vectorA.map(v => parseFloat(v) || 0);
                const vecB = params.vectorB.map(v => parseFloat(v) || 0);
                const steps = [];
                
                steps.push('**步骤 1：写出向量分量**');
                steps.push(`a = (${vecA[0]}, ${vecA[1]}, ${vecA[2]})`);
                steps.push(`b = (${vecB[0]}, ${vecB[1]}, ${vecB[2]})`);
                
                steps.push('**步骤 2：使用行列式公式计算叉积**');
                const cx = vecA[1] * vecB[2] - vecA[2] * vecB[1];
                const cy = vecA[2] * vecB[0] - vecA[0] * vecB[2];
                const cz = vecA[0] * vecB[1] - vecA[1] * vecB[0];
                
                steps.push(`c_x = a_y×b_z - a_z×b_y = ${vecA[1]}×${vecB[2]} - ${vecA[2]}×${vecB[1]} = ${cx}`);
                steps.push(`c_y = a_z×b_x - a_x×b_z = ${vecA[2]}×${vecB[0]} - ${vecA[0]}×${vecB[2]} = ${cy}`);
                steps.push(`c_z = a_x×b_y - a_y×b_x = ${vecA[0]}×${vecB[1]} - ${vecA[1]}×${vecB[0]} = ${cz}`);
                
                const result = [cx, cy, cz];
                
                steps.push('**步骤 3：叉积结果**');
                steps.push(`a × b = (${cx}, ${cy}, ${cz})`);
                
                steps.push('**步骤 4：验证正交性（可选）**');
                const dotA = vecA[0]*cx + vecA[1]*cy + vecA[2]*cz;
                const dotB = vecB[0]*cx + vecB[1]*cy + vecB[2]*cz;
                steps.push(`(a × b) · a = ${dotA.toFixed(6)}（应为0，表示垂直）`);
                steps.push(`(a × b) · b = ${dotB.toFixed(6)}（应为0，表示垂直）`);
                
                steps.push('**步骤 5：计算叉积模长（平行四边形面积）**');
                const norm = Math.sqrt(cx*cx + cy*cy + cz*cz);
                steps.push(`|a × b| = ${norm.toFixed(4)}`);
                
                return {
                    result: result,
                    steps: steps,
                    latex: `\\mathbf{a} \\times \\mathbf{b} = (${cx}, ${cy}, ${cz})`
                };
            },
            visualize: function(result, params) {
                const vecA = params.vectorA.map(v => parseFloat(v) || 0);
                const vecB = params.vectorB.map(v => parseFloat(v) || 0);
                
                const trace1 = {
                    x: [0, vecA[0]],
                    y: [0, vecA[1]],
                    z: [0, vecA[2]],
                    type: 'scatter3d',
                    mode: 'lines+markers',
                    name: '向量 a',
                    line: { color: 'blue', width: 5 },
                    marker: { size: 4 }
                };
                
                const trace2 = {
                    x: [0, vecB[0]],
                    y: [0, vecB[1]],
                    z: [0, vecB[2]],
                    type: 'scatter3d',
                    mode: 'lines+markers',
                    name: '向量 b',
                    line: { color: 'red', width: 5 },
                    marker: { size: 4 }
                };
                
                const trace3 = {
                    x: [0, result[0]],
                    y: [0, result[1]],
                    z: [0, result[2]],
                    type: 'scatter3d',
                    mode: 'lines+markers',
                    name: '叉积 a×b',
                    line: { color: 'green', width: 5 },
                    marker: { size: 4 }
                };
                
                const layout = {
                    title: `向量叉积 = (${result[0]}, ${result[1]}, ${result[2]})`,
                    scene: {
                        xaxis: { title: 'x' },
                        yaxis: { title: 'y' },
                        zaxis: { title: 'z' }
                    },
                    showlegend: true
                };
                
                return { data: [trace1, trace2, trace3], layout: layout };
            }
        },
        
        'derivative': {
            title: '函数求导',
            category: 'calculus',
            description: '导数表示函数在某一点的瞬时变化率，几何上表示函数曲线在该点的切线斜率。本模块支持常用函数的符号求导和数值导数计算。',
            formula: '$$f\'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$$',
            parameters: [
                { name: 'functionType', type: 'select', options: ['多项式', '三角函数', '指数函数', '对数函数'], label: '函数类型', default: '多项式' },
                { name: 'functionExpr', type: 'text', label: '函数表达式 (如: x^2 + 3x)', default: 'x^2 + 3x' },
                { name: 'xValue', type: 'number', label: '计算点 x', default: '2' }
            ],
            calculate: function(params) {
                const x = parseFloat(params.xValue) || 0;
                const h = 1e-6;
                const steps = [];
                const functionExpr = params.functionExpr;
                
                steps.push('**步骤 1：定义函数**');
                steps.push(`f(x) = ${functionExpr}`);
                
                steps.push('**步骤 2：使用数值方法计算导数（中心差分）**');
                steps.push(`f'(x) ≈ [f(x+h) - f(x-h)] / (2h)，其中 h = ${h}`);
                
                const evaluate = (expr, xVal) => {
                    try {
                        let safeExpr = expr;
                        
                        safeExpr = safeExpr
                            .replace(/sin/g, 'Math.sin')
                            .replace(/cos/g, 'Math.cos')
                            .replace(/tan/g, 'Math.tan')
                            .replace(/log/g, 'Math.log')
                            .replace(/ln/g, 'Math.log')
                            .replace(/exp/g, 'Math.exp')
                            .replace(/sqrt/g, 'Math.sqrt');
                        
                        safeExpr = safeExpr.replace(/(\d+)([x\(])/g, '$1*$2');
                        safeExpr = safeExpr.replace(/([\)])([x\(])/g, '$1*$2');
                        safeExpr = safeExpr.replace(/x\(/g, 'x*(');
                        
                        safeExpr = safeExpr.replace(/\^/g, '**');
                        
                        safeExpr = safeExpr.replace(/x/g, `(${xVal})`);
                        
                        return eval(safeExpr);
                    } catch (e) {
                        console.error('表达式计算错误:', expr, 'xVal=', xVal, 'error:', e);
                        return NaN;
                    }
                };
                
                const fxph = evaluate(functionExpr, x + h);
                const fxmh = evaluate(functionExpr, x - h);
                const fx = evaluate(functionExpr, x);
                
                steps.push(`f(${x}) = ${fx.toFixed(6)}`);
                steps.push(`f(${x}+h) = f(${x+h}) = ${fxph.toFixed(6)}`);
                steps.push(`f(${x}-h) = f(${x-h}) = ${fxmh.toFixed(6)}`);
                
                const derivative = (fxph - fxmh) / (2 * h);
                
                steps.push(`f'(${x}) ≈ [${fxph.toFixed(6)} - ${fxmh.toFixed(6)}] / (2×${h}) = ${derivative.toFixed(6)}`);
                
                steps.push('**步骤 3：几何意义**');
                steps.push(`f'(${x}) = ${derivative.toFixed(6)} 表示函数在 x=${x} 处的切线斜率。`);
                steps.push(`切线方程：y - ${fx.toFixed(4)} = ${derivative.toFixed(4)}(x - ${x})`);
                
                return {
                    result: derivative,
                    functionValue: fx,
                    steps: steps,
                    latex: `f'(${x}) \\approx ${derivative.toFixed(6)}`
                };
            },
            visualize: function(result, params) {
                const x = parseFloat(params.xValue) || 0;
                const functionExpr = params.functionExpr;
                
                const evaluate = (expr, xVal) => {
                    try {
                        let safeExpr = expr;
                        
                        safeExpr = safeExpr
                            .replace(/sin/g, 'Math.sin')
                            .replace(/cos/g, 'Math.cos')
                            .replace(/tan/g, 'Math.tan')
                            .replace(/log/g, 'Math.log')
                            .replace(/ln/g, 'Math.log')
                            .replace(/exp/g, 'Math.exp')
                            .replace(/sqrt/g, 'Math.sqrt');
                        
                        safeExpr = safeExpr.replace(/(\d+)([x\(])/g, '$1*$2');
                        safeExpr = safeExpr.replace(/([\)])([x\(])/g, '$1*$2');
                        safeExpr = safeExpr.replace(/x\(/g, 'x*(');
                        
                        safeExpr = safeExpr.replace(/\^/g, '**');
                        
                        safeExpr = safeExpr.replace(/x/g, `(${xVal})`);
                        
                        return eval(safeExpr);
                    } catch (e) {
                        console.error('表达式计算错误:', expr, 'xVal=', xVal, 'error:', e);
                        return NaN;
                    }
                };
                
                const xValues = [];
                const yValues = [];
                const tangentValues = [];
                
                const range = 3;
                const fx = evaluate(functionExpr, x);
                
                for (let xv = x - range; xv <= x + range; xv += 0.1) {
                    xValues.push(xv);
                    const yv = evaluate(functionExpr, xv);
                    yValues.push(yv);
                    const tangentY = fx + result * (xv - x);
                    tangentValues.push(tangentY);
                }
                
                const trace1 = {
                    x: xValues,
                    y: yValues,
                    type: 'scatter',
                    mode: 'lines',
                    name: `f(x) = ${functionExpr}`,
                    line: { color: 'blue', width: 3 }
                };
                
                const trace2 = {
                    x: xValues,
                    y: tangentValues,
                    type: 'scatter',
                    mode: 'lines',
                    name: '切线',
                    line: { color: 'red', width: 2, dash: 'dash' }
                };
                
                const trace3 = {
                    x: [x],
                    y: [fx],
                    type: 'scatter',
                    mode: 'markers',
                    name: '切点',
                    marker: { color: 'green', size: 12 }
                };
                
                const layout = {
                    title: `函数图像与切线（斜率 = ${result.toFixed(4)}）`,
                    xaxis: { title: 'x' },
                    yaxis: { title: 'y' },
                    showlegend: true,
                    annotations: [
                        {
                            x: x,
                            y: fx,
                            text: `(${x.toFixed(2)}, ${fx.toFixed(2)})`,
                            showarrow: true,
                            arrowhead: 2,
                            ax: 20,
                            ay: -20
                        }
                    ]
                };
                
                return { data: [trace1, trace2, trace3], layout: layout };
            }
        },
        
        'integral': {
            title: '定积分',
            category: 'calculus',
            description: '定积分表示函数曲线在某一区间下与x轴围成的面积。使用数值积分方法（梯形法、辛普森法）计算定积分的近似值。',
            formula: '$$\\int_a^b f(x) dx = \\lim_{n \\to \\infty} \\sum_{i=1}^n f(x_i^*) \\Delta x$$',
            parameters: [
                { name: 'functionType', type: 'select', options: ['多项式', '三角函数', '指数函数'], label: '函数类型', default: '多项式' },
                { name: 'functionExpr', type: 'text', label: '函数表达式 (如: x^2)', default: 'x^2' },
                { name: 'lowerLimit', type: 'number', label: '下限 a', default: '0' },
                { name: 'upperLimit', type: 'number', label: '上限 b', default: '2' },
                { name: 'method', type: 'select', options: ['梯形法', '辛普森法'], label: '积分方法', default: '辛普森法' }
            ],
            calculate: function(params) {
                const a = parseFloat(params.lowerLimit) || 0;
                const b = parseFloat(params.upperLimit) || 1;
                const n = 100;
                const functionExpr = params.functionExpr;
                const method = params.method;
                const steps = [];
                
                steps.push('**步骤 1：定义积分区间和函数**');
                steps.push(`积分区间：[${a}, ${b}]`);
                steps.push(`被积函数：f(x) = ${functionExpr}`);
                steps.push(`使用方法：${method}`);
                
                const evaluate = (expr, xVal) => {
                    try {
                        let safeExpr = expr
                            .replace(/x/g, `(${xVal})`)
                            .replace(/\^/g, '**')
                            .replace(/sin/g, 'Math.sin')
                            .replace(/cos/g, 'Math.cos')
                            .replace(/tan/g, 'Math.tan')
                            .replace(/log/g, 'Math.log')
                            .replace(/exp/g, 'Math.exp')
                            .replace(/sqrt/g, 'Math.sqrt');
                        return eval(safeExpr);
                    } catch (e) {
                        return NaN;
                    }
                };
                
                const dx = (b - a) / n;
                steps.push('**步骤 2：分割区间**');
                steps.push(`将 [${a}, ${b}] 分成 ${n} 个子区间，每个子区间宽度 Δx = ${dx.toFixed(6)}`);
                
                let result;
                
                if (method === '梯形法') {
                    steps.push('**步骤 3：应用梯形法公式**');
                    steps.push('∫f(x)dx ≈ (Δx/2)×[f(x₀) + 2f(x₁) + 2f(x₂) + ... + 2f(x_{n-1}) + f(x_n)]');
                    
                    let sum = evaluate(functionExpr, a) + evaluate(functionExpr, b);
                    for (let i = 1; i < n; i++) {
                        const x = a + i * dx;
                        sum += 2 * evaluate(functionExpr, x);
                    }
                    result = (dx / 2) * sum;
                    
                    steps.push(`梯形法计算结果：${result.toFixed(8)}`);
                } else {
                    steps.push('**步骤 3：应用辛普森法公式**');
                    steps.push('∫f(x)dx ≈ (Δx/3)×[f(x₀) + 4f(x₁) + 2f(x₂) + 4f(x₃) + ... + f(x_n)]');
                    
                    let sum = evaluate(functionExpr, a) + evaluate(functionExpr, b);
                    for (let i = 1; i < n; i++) {
                        const x = a + i * dx;
                        const coefficient = (i % 2 === 1) ? 4 : 2;
                        sum += coefficient * evaluate(functionExpr, x);
                    }
                    result = (dx / 3) * sum;
                    
                    steps.push(`辛普森法计算结果：${result.toFixed(8)}`);
                }
                
                steps.push('**步骤 4：几何意义**');
                steps.push(`积分结果 ${result.toFixed(6)} 表示曲线 y = ${functionExpr} 在区间 [${a}, ${b}] 下的面积。`);
                
                return {
                    result: result,
                    a: a,
                    b: b,
                    steps: steps,
                    latex: `\\int_{${a}}^{${b}} f(x) dx \\approx ${result.toFixed(6)}`
                };
            },
            visualize: function(result, params) {
                const a = parseFloat(params.lowerLimit) || 0;
                const b = parseFloat(params.upperLimit) || 1;
                const functionExpr = params.functionExpr;
                
                const evaluate = (expr, xVal) => {
                    try {
                        let safeExpr = expr;
                        
                        safeExpr = safeExpr
                            .replace(/sin/g, 'Math.sin')
                            .replace(/cos/g, 'Math.cos')
                            .replace(/tan/g, 'Math.tan')
                            .replace(/log/g, 'Math.log')
                            .replace(/ln/g, 'Math.log')
                            .replace(/exp/g, 'Math.exp')
                            .replace(/sqrt/g, 'Math.sqrt');
                        
                        safeExpr = safeExpr.replace(/(\d+)([x\(])/g, '$1*$2');
                        safeExpr = safeExpr.replace(/([\)])([x\(])/g, '$1*$2');
                        safeExpr = safeExpr.replace(/x\(/g, 'x*(');
                        
                        safeExpr = safeExpr.replace(/\^/g, '**');
                        
                        safeExpr = safeExpr.replace(/x/g, `(${xVal})`);
                        
                        return eval(safeExpr);
                    } catch (e) {
                        console.error('表达式计算错误:', expr, 'xVal=', xVal, 'error:', e);
                        return NaN;
                    }
                };
                
                const padding = (b - a) * 0.2;
                const xValues = [];
                const yValues = [];
                const fillX = [];
                const fillY = [];
                
                for (let xv = a - padding; xv <= b + padding; xv += 0.1) {
                    xValues.push(xv);
                    yValues.push(evaluate(functionExpr, xv));
                }
                
                for (let xv = a; xv <= b; xv += 0.1) {
                    fillX.push(xv);
                    fillY.push(evaluate(functionExpr, xv));
                }
                fillX.push(b);
                fillY.push(0);
                fillX.push(a);
                fillY.push(0);
                
                const trace1 = {
                    x: xValues,
                    y: yValues,
                    type: 'scatter',
                    mode: 'lines',
                    name: `f(x) = ${functionExpr}`,
                    line: { color: 'blue', width: 3 }
                };
                
                const trace2 = {
                    x: fillX,
                    y: fillY,
                    type: 'scatter',
                    mode: 'none',
                    fill: 'toself',
                    fillcolor: 'rgba(0, 128, 0, 0.3)',
                    name: '积分区域'
                };
                
                const layout = {
                    title: `定积分可视化（面积 ≈ ${result.toFixed(6)}）`,
                    xaxis: { title: 'x' },
                    yaxis: { title: 'y' },
                    showlegend: true,
                    annotations: [
                        {
                            x: (a + b) / 2,
                            y: result / (b - a),
                            text: `面积 = ${result.toFixed(4)}`,
                            showarrow: false,
                            font: { size: 14, color: 'green' }
                        }
                    ]
                };
                
                return { data: [trace1, trace2], layout: layout };
            }
        },
        
        'indefinite-integral': {
            title: '不定积分',
            category: 'calculus',
            description: '不定积分是导数的逆运算，表示一族原函数。本模块演示基本积分公式和积分方法，并展示积分结果的函数族。',
            formula: '$$\\int f(x) dx = F(x) + C$$',
            formula2: '$$其中 F\'(x) = f(x)$$',
            parameters: [
                { name: 'functionType', type: 'select', options: ['幂函数', '三角函数', '指数函数'], label: '函数类型', default: '幂函数' },
                { name: 'functionExpr', type: 'text', label: '被积函数 (如: x^2)', default: 'x^2' },
                { name: 'CValues', type: 'text', label: '积分常数 C（逗号分隔）', default: '-2, 0, 2' }
            ],
            calculate: function(params) {
                const functionExpr = params.functionExpr;
                const CValues = params.CValues.split(',').map(s => parseFloat(s.trim()) || 0);
                const steps = [];
                
                steps.push('**步骤 1：识别被积函数**');
                steps.push(`f(x) = ${functionExpr}`);
                
                steps.push('**步骤 2：应用基本积分公式**');
                
                let integralForm = '';
                if (functionExpr.includes('x^')) {
                    const match = functionExpr.match(/x\^(\d+)/);
                    if (match) {
                        const n = parseInt(match[1]);
                        integralForm = `\\frac{x^{${n+1}}}{${n+1}} + C`;
                        steps.push(`∫x^${n} dx = x^${n+1}/${n+1} + C = ${integralForm}`);
                    }
                } else if (functionExpr.includes('sin')) {
                    integralForm = '-\\cos(x) + C';
                    steps.push(`∫sin(x) dx = -cos(x) + C = ${integralForm}`);
                } else if (functionExpr.includes('cos')) {
                    integralForm = '\\sin(x) + C';
                    steps.push(`∫cos(x) dx = sin(x) + C = ${integralForm}`);
                } else if (functionExpr.includes('exp') || functionExpr.includes('e^')) {
                    integralForm = 'e^x + C';
                    steps.push(`∫e^x dx = e^x + C = ${integralForm}`);
                } else {
                    integralForm = 'F(x) + C';
                    steps.push('积分结果取决于具体函数形式');
                }
                
                steps.push('**步骤 3：积分常数的意义**');
                steps.push('C 表示任意常数，不定积分表示一族函数。');
                steps.push(`当 C = ${CValues.map(c => c.toString()).join(', ')} 时，得到不同的原函数。`);
                
                steps.push('**步骤 4：验证**');
                steps.push('可以通过对结果求导来验证积分是否正确。');
                
                return {
                    result: { integralForm: integralForm, CValues: CValues },
                    steps: steps,
                    latex: `\\int f(x) dx = ${integralForm}`
                };
            },
            visualize: function(result, params) {
                const functionExpr = params.functionExpr;
                const CValues = result.CValues;
                const colors = ['red', 'blue', 'green', 'orange', 'purple'];
                
                const evaluateIntegral = (xVal, C) => {
                    try {
                        if (functionExpr.includes('x^')) {
                            const match = functionExpr.match(/x\^(\d+)/);
                            if (match) {
                                const n = parseInt(match[1]);
                                return Math.pow(xVal, n + 1) / (n + 1) + C;
                            }
                        } else if (functionExpr.includes('sin')) {
                            return -Math.cos(xVal) + C;
                        } else if (functionExpr.includes('cos')) {
                            return Math.sin(xVal) + C;
                        } else if (functionExpr.includes('exp') || functionExpr.includes('e^')) {
                            return Math.exp(xVal) + C;
                        }
                        return xVal + C;
                    } catch (e) {
                        return NaN;
                    }
                };
                
                const xValues = [];
                const traces = [];
                
                for (let xv = -3; xv <= 3; xv += 0.1) {
                    xValues.push(xv);
                }
                
                CValues.forEach((C, index) => {
                    const yValues = xValues.map(x => evaluateIntegral(x, C));
                    traces.push({
                        x: xValues,
                        y: yValues,
                        type: 'scatter',
                        mode: 'lines',
                        name: `C = ${C}`,
                        line: { color: colors[index % colors.length], width: 2 }
                    });
                });
                
                const layout = {
                    title: `不定积分的函数族（∫${functionExpr}dx = F(x) + C）`,
                    xaxis: { title: 'x' },
                    yaxis: { title: 'y' },
                    showlegend: true
                };
                
                return { data: traces, layout: layout };
            }
        },
        
        'limit': {
            title: '极限计算',
            category: 'calculus',
            description: '极限是微积分的基础概念，表示函数在自变量趋近于某个值时的趋势。本模块演示函数在某点的极限、左右极限以及无穷极限。',
            formula: '$$\\lim_{x \\to a} f(x) = L$$',
            parameters: [
                { name: 'functionType', type: 'select', options: ['有理函数', '三角函数', '指数函数'], label: '函数类型', default: '有理函数' },
                { name: 'functionExpr', type: 'text', label: '函数表达式 (如: (x^2-1)/(x-1))', default: '(x^2-1)/(x-1)' },
                { name: 'approachValue', type: 'text', label: '趋近值 a（inf表示无穷）', default: '1' },
                { name: 'side', type: 'select', options: ['双侧', '左极限', '右极限'], label: '极限方向', default: '双侧' }
            ],
            calculate: function(params) {
                const functionExpr = params.functionExpr;
                const approachValue = params.approachValue;
                const side = params.side;
                const steps = [];
                
                steps.push('**步骤 1：定义极限问题**');
                let a;
                let isInfinity = false;
                
                if (approachValue.toLowerCase() === 'inf' || approachValue.toLowerCase() === 'infinity') {
                    isInfinity = true;
                    steps.push(`计算极限：lim(x → ∞) ${functionExpr}`);
                } else {
                    a = parseFloat(approachValue);
                    if (side === '左极限') {
                        steps.push(`计算左极限：lim(x → ${a}⁻) ${functionExpr}`);
                    } else if (side === '右极限') {
                        steps.push(`计算右极限：lim(x → ${a}⁺) ${functionExpr}`);
                    } else {
                        steps.push(`计算极限：lim(x → ${a}) ${functionExpr}`);
                    }
                }
                
                const evaluate = (expr, xVal) => {
                    try {
                        let safeExpr = expr
                            .replace(/x/g, `(${xVal})`)
                            .replace(/\^/g, '**')
                            .replace(/sin/g, 'Math.sin')
                            .replace(/cos/g, 'Math.cos')
                            .replace(/tan/g, 'Math.tan')
                            .replace(/log/g, 'Math.log')
                            .replace(/exp/g, 'Math.exp')
                            .replace(/sqrt/g, 'Math.sqrt');
                        return eval(safeExpr);
                    } catch (e) {
                        return NaN;
                    }
                };
                
                steps.push('**步骤 2：数值逼近计算**');
                let result;
                
                if (isInfinity) {
                    const largeX = [10, 100, 1000, 10000];
                    steps.push('通过让 x 取越来越大的值来观察趋势：');
                    const values = largeX.map(x => ({ x: x, value: evaluate(functionExpr, x) }));
                    values.forEach(v => {
                        steps.push(`f(${v.x}) = ${v.value.toFixed(8)}`);
                    });
                    result = values[values.length - 1].value;
                } else {
                    const h = 0.01;
                    
                    if (side === '左极限' || side === '双侧') {
                        steps.push('左极限逼近（从左边接近）：');
                        const leftPoints = [a - h * 10, a - h * 5, a - h, a - h / 10];
                        leftPoints.forEach(x => {
                            steps.push(`f(${x.toFixed(4)}) = ${evaluate(functionExpr, x).toFixed(8)}`);
                        });
                    }
                    
                    if (side === '右极限' || side === '双侧') {
                        steps.push('右极限逼近（从右边接近）：');
                        const rightPoints = [a + h / 10, a + h, a + h * 5, a + h * 10];
                        rightPoints.forEach(x => {
                            steps.push(`f(${x.toFixed(4)}) = ${evaluate(functionExpr, x).toFixed(8)}`);
                        });
                    }
                    
                    const centerH = 1e-6;
                    if (side === '左极限') {
                        result = evaluate(functionExpr, a - centerH);
                    } else if (side === '右极限') {
                        result = evaluate(functionExpr, a + centerH);
                    } else {
                        const leftLimit = evaluate(functionExpr, a - centerH);
                        const rightLimit = evaluate(functionExpr, a + centerH);
                        if (Math.abs(leftLimit - rightLimit) < 1e-4) {
                            result = (leftLimit + rightLimit) / 2;
                            steps.push(`左右极限相等，极限存在：${result.toFixed(6)}`);
                        } else {
                            steps.push(`左极限 ≈ ${leftLimit.toFixed(6)}，右极限 ≈ ${rightLimit.toFixed(6)}`);
                            steps.push('左右极限不相等，极限不存在！');
                            return {
                                result: null,
                                steps: steps,
                                error: '极限不存在（左右极限不相等）'
                            };
                        }
                    }
                }
                
                steps.push('**步骤 3：结果分析**');
                steps.push(`极限值约为：${result.toFixed(6)}`);
                
                return {
                    result: result,
                    steps: steps,
                    latex: `\\lim f(x) \\approx ${result.toFixed(6)}`
                };
            },
            visualize: function(result, params) {
                const functionExpr = params.functionExpr;
                const approachValue = params.approachValue;
                
                const evaluate = (expr, xVal) => {
                    try {
                        let safeExpr = expr;
                        
                        safeExpr = safeExpr
                            .replace(/sin/g, 'Math.sin')
                            .replace(/cos/g, 'Math.cos')
                            .replace(/tan/g, 'Math.tan')
                            .replace(/log/g, 'Math.log')
                            .replace(/ln/g, 'Math.log')
                            .replace(/exp/g, 'Math.exp')
                            .replace(/sqrt/g, 'Math.sqrt');
                        
                        safeExpr = safeExpr.replace(/(\d+)([x\(])/g, '$1*$2');
                        safeExpr = safeExpr.replace(/([\)])([x\(])/g, '$1*$2');
                        safeExpr = safeExpr.replace(/x\(/g, 'x*(');
                        
                        safeExpr = safeExpr.replace(/\^/g, '**');
                        
                        safeExpr = safeExpr.replace(/x/g, `(${xVal})`);
                        
                        return eval(safeExpr);
                    } catch (e) {
                        console.error('表达式计算错误:', expr, 'xVal=', xVal, 'error:', e);
                        return NaN;
                    }
                };
                
                let a, isInfinity = false;
                if (approachValue.toLowerCase() === 'inf' || approachValue.toLowerCase() === 'infinity') {
                    isInfinity = true;
                    a = 0;
                } else {
                    a = parseFloat(approachValue);
                }
                
                const xValues = [];
                const yValues = [];
                const range = isInfinity ? 10 : 2;
                
                for (let xv = (isInfinity ? 0.1 : a - range); xv <= (isInfinity ? 20 : a + range); xv += 0.05) {
                    xValues.push(xv);
                    const yv = evaluate(functionExpr, xv);
                    yValues.push(yv);
                }
                
                const traces = [];
                
                traces.push({
                    x: xValues,
                    y: yValues,
                    type: 'scatter',
                    mode: 'lines',
                    name: `f(x) = ${functionExpr}`,
                    line: { color: 'blue', width: 3 }
                });
                
                if (!isInfinity) {
                    traces.push({
                        x: [a],
                        y: [result],
                        type: 'scatter',
                        mode: 'markers',
                        name: '极限点',
                        marker: { color: 'red', size: 12 }
                    });
                }
                
                const layout = {
                    title: `极限可视化（极限 ≈ ${result.toFixed(4)}）`,
                    xaxis: { title: 'x' },
                    yaxis: { title: 'y' },
                    showlegend: true
                };
                
                return { data: traces, layout: layout };
            }
        },
        
        'series': {
            title: '级数求和',
            category: 'calculus',
            description: '级数是将数列的项依次相加得到的和。本模块演示有限级数求和、无穷级数收敛性判断，以及部分和序列的可视化。',
            formula: '$$S_n = \\sum_{k=1}^n a_k = a_1 + a_2 + a_3 + ... + a_n$$',
            parameters: [
                { name: 'seriesType', type: 'select', options: ['等差数列', '等比数列', 'p-级数'], label: '级数类型', default: '等差数列' },
                { name: 'firstTerm', type: 'number', label: '首项 a₁', default: '1' },
                { name: 'commonValue', type: 'number', label: '公差/公比/p', default: '1' },
                { name: 'nTerms', type: 'number', label: '求和项数 n', default: '10' }
            ],
            calculate: function(params) {
                const seriesType = params.seriesType;
                const a1 = parseFloat(params.firstTerm) || 1;
                const commonValue = parseFloat(params.commonValue) || 1;
                const n = parseInt(params.nTerms) || 10;
                const steps = [];
                
                steps.push('**步骤 1：定义级数**');
                
                let terms = [];
                let result;
                let seriesInfo = '';
                
                if (seriesType === '等差数列') {
                    const d = commonValue;
                    seriesInfo = `等差数列：a₁ = ${a1}, 公差 d = ${d}`;
                    steps.push(seriesInfo);
                    steps.push(`通项公式：a_k = ${a1} + (k-1)×${d}`);
                    
                    steps.push('**步骤 2：写出前几项**');
                    for (let k = 1; k <= Math.min(n, 5); k++) {
                        const ak = a1 + (k - 1) * d;
                        terms.push(ak);
                        steps.push(`a_${k} = ${ak}`);
                    }
                    
                    steps.push('**步骤 3：应用等差数列求和公式**');
                    const an = a1 + (n - 1) * d;
                    steps.push(`S_${n} = n×(a₁ + a_${n})/2 = ${n}×(${a1} + ${an})/2`);
                    result = n * (a1 + an) / 2;
                    steps.push(`S_${n} = ${result}`);
                    
                    for (let k = 1; k <= n; k++) {
                        terms.push(a1 + (k - 1) * d);
                    }
                } else if (seriesType === '等比数列') {
                    const r = commonValue;
                    seriesInfo = `等比数列：a₁ = ${a1}, 公比 r = ${r}`;
                    steps.push(seriesInfo);
                    steps.push(`通项公式：a_k = ${a1}×${r}^(k-1)`);
                    
                    steps.push('**步骤 2：写出前几项**');
                    for (let k = 1; k <= Math.min(n, 5); k++) {
                        const ak = a1 * Math.pow(r, k - 1);
                        terms.push(ak);
                        steps.push(`a_${k} = ${ak.toFixed(4)}`);
                    }
                    
                    steps.push('**步骤 3：应用等比数列求和公式**');
                    if (Math.abs(r - 1) < 1e-10) {
                        result = a1 * n;
                        steps.push(`公比 r = 1，S_${n} = ${a1}×${n} = ${result}`);
                    } else {
                        steps.push(`S_${n} = ${a1}×(1 - ${r}^${n})/(1 - ${r})`);
                        result = a1 * (1 - Math.pow(r, n)) / (1 - r);
                        steps.push(`S_${n} = ${result.toFixed(6)}`);
                    }
                    
                    steps.push('**步骤 4：无穷级数收敛性分析**');
                    if (Math.abs(r) < 1) {
                        const infiniteSum = a1 / (1 - r);
                        steps.push(`|r| = ${Math.abs(r)} < 1，无穷级数收敛，和为：${infiniteSum.toFixed(6)}`);
                    } else {
                        steps.push(`|r| = ${Math.abs(r)} ≥ 1，无穷级数发散`);
                    }
                } else if (seriesType === 'p-级数') {
                    const p = commonValue;
                    seriesInfo = `p-级数：a_k = 1/k^${p}`;
                    steps.push(seriesInfo);
                    
                    steps.push('**步骤 2：写出前几项**');
                    let sum = 0;
                    const partialSums = [];
                    for (let k = 1; k <= n; k++) {
                        const ak = 1 / Math.pow(k, p);
                        sum += ak;
                        terms.push(ak);
                        partialSums.push(sum);
                        if (k <= 5) {
                            steps.push(`a_${k} = 1/${k}^${p} = ${ak.toFixed(6)}，S_${k} = ${sum.toFixed(6)}`);
                        }
                    }
                    
                    result = sum;
                    steps.push(`**步骤 3：前 ${n} 项和**`);
                    steps.push(`S_${n} = ${result.toFixed(8)}`);
                    
                    steps.push('**步骤 4：无穷级数收敛性分析**');
                    if (p > 1) {
                        steps.push(`p = ${p} > 1，p-级数收敛`);
                    } else {
                        steps.push(`p = ${p} ≤ 1，p-级数发散`);
                    }
                }
                
                return {
                    result: result,
                    steps: steps,
                    latex: `S_{${n}} = ${typeof result === 'number' ? result.toFixed(6) : result}`
                };
            },
            visualize: function(result, params) {
                const seriesType = params.seriesType;
                const a1 = parseFloat(params.firstTerm) || 1;
                const commonValue = parseFloat(params.commonValue) || 1;
                const n = parseInt(params.nTerms) || 10;
                
                const kValues = [];
                const termValues = [];
                const partialSumValues = [];
                let partialSum = 0;
                
                for (let k = 1; k <= n; k++) {
                    kValues.push(k);
                    let ak;
                    
                    if (seriesType === '等差数列') {
                        ak = a1 + (k - 1) * commonValue;
                    } else if (seriesType === '等比数列') {
                        ak = a1 * Math.pow(commonValue, k - 1);
                    } else {
                        ak = 1 / Math.pow(k, commonValue);
                    }
                    
                    termValues.push(ak);
                    partialSum += ak;
                    partialSumValues.push(partialSum);
                }
                
                const trace1 = {
                    x: kValues,
                    y: termValues,
                    type: 'bar',
                    name: '项 a_k',
                    marker: { color: 'rgba(0, 128, 255, 0.7)' }
                };
                
                const trace2 = {
                    x: kValues,
                    y: partialSumValues,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: '部分和 S_k',
                    line: { color: 'red', width: 3 },
                    marker: { size: 8 }
                };
                
                const layout = {
                    title: `级数可视化（前 ${n} 项和 = ${result.toFixed(4)}）`,
                    xaxis: { title: 'k（项索引）', dtick: 1 },
                    yaxis: { title: '值' },
                    showlegend: true
                };
                
                return { data: [trace1, trace2], layout: layout };
            }
        },
        
        'taylor': {
            title: '泰勒展开',
            category: 'calculus',
            description: '泰勒展开是用多项式近似表示函数的方法。在给定点附近，泰勒多项式可以很好地逼近原函数。本模块演示常用函数的泰勒展开及其逼近效果。',
            formula: '$$f(x) = \\sum_{n=0}^\\infty \\frac{f^{(n)}(a)}{n!}(x-a)^n$$',
            formula2: '$$（麦克劳林展开：a=0时）$$',
            parameters: [
                { name: 'functionType', type: 'select', options: ['sin(x)', 'cos(x)', 'e^x', 'ln(1+x)'], label: '函数类型', default: 'sin(x)' },
                { name: 'center', type: 'number', label: '展开中心 a', default: '0' },
                { name: 'degree', type: 'number', label: '展开阶数', default: '5' },
                { name: 'xValue', type: 'number', label: '计算点 x', default: '0.5' }
            ],
            calculate: function(params) {
                const functionType = params.functionType;
                const a = parseFloat(params.center) || 0;
                const degree = parseInt(params.degree) || 5;
                const x = parseFloat(params.xValue) || 0;
                const steps = [];
                
                steps.push('**步骤 1：定义泰勒展开**');
                steps.push(`展开函数：${functionType}`);
                steps.push(`展开中心：a = ${a}`);
                steps.push(`展开阶数：${degree} 阶`);
                steps.push(`计算点：x = ${x}`);
                
                steps.push('**步骤 2：泰勒展开公式**');
                steps.push(`P(x) = Σ[f^(n)(a)/n!] × (x - a)^n，n 从 0 到 ${degree}`);
                
                const factorial = (n) => {
                    let result = 1;
                    for (let i = 2; i <= n; i++) result *= i;
                    return result;
                };
                
                let result = 0;
                const terms = [];
                
                steps.push('**步骤 3：计算各阶导数在展开中心的值**');
                
                if (functionType === 'sin(x)') {
                    steps.push('sin(x)的导数周期为4：sin, cos, -sin, -cos, sin, ...');
                    for (let n = 0; n <= degree; n++) {
                        const remainder = n % 4;
                        let derivative;
                        let sign = 1;
                        
                        if (remainder === 0) {
                            derivative = Math.sin(a);
                        } else if (remainder === 1) {
                            derivative = Math.cos(a);
                        } else if (remainder === 2) {
                            derivative = -Math.sin(a);
                        } else {
                            derivative = -Math.cos(a);
                        }
                        
                        const fact = factorial(n);
                        const coeff = derivative / fact;
                        const xMinusA = x - a;
                        const term = coeff * Math.pow(xMinusA, n);
                        
                        terms.push({ n: n, derivative: derivative, coeff: coeff, term: term });
                        result += term;
                        
                        if (n <= 5) {
                            steps.push(`n = ${n}: f^(${n})(${a}) = ${derivative.toFixed(6)}, 项 = ${term.toFixed(10)}`);
                        }
                    }
                } else if (functionType === 'cos(x)') {
                    steps.push('cos(x)的导数周期为4：cos, -sin, -cos, sin, cos, ...');
                    for (let n = 0; n <= degree; n++) {
                        const remainder = n % 4;
                        let derivative;
                        
                        if (remainder === 0) {
                            derivative = Math.cos(a);
                        } else if (remainder === 1) {
                            derivative = -Math.sin(a);
                        } else if (remainder === 2) {
                            derivative = -Math.cos(a);
                        } else {
                            derivative = Math.sin(a);
                        }
                        
                        const fact = factorial(n);
                        const coeff = derivative / fact;
                        const xMinusA = x - a;
                        const term = coeff * Math.pow(xMinusA, n);
                        
                        terms.push({ n: n, derivative: derivative, coeff: coeff, term: term });
                        result += term;
                        
                        if (n <= 5) {
                            steps.push(`n = ${n}: f^(${n})(${a}) = ${derivative.toFixed(6)}, 项 = ${term.toFixed(10)}`);
                        }
                    }
                } else if (functionType === 'e^x') {
                    steps.push('e^x的导数等于自身：(e^x)^(n) = e^x');
                    const ea = Math.exp(a);
                    for (let n = 0; n <= degree; n++) {
                        const derivative = ea;
                        const fact = factorial(n);
                        const coeff = derivative / fact;
                        const xMinusA = x - a;
                        const term = coeff * Math.pow(xMinusA, n);
                        
                        terms.push({ n: n, derivative: derivative, coeff: coeff, term: term });
                        result += term;
                        
                        if (n <= 5) {
                            steps.push(`n = ${n}: f^(${n})(${a}) = e^${a} = ${derivative.toFixed(6)}, 项 = ${term.toFixed(10)}`);
                        }
                    }
                } else if (functionType === 'ln(1+x)') {
                    steps.push('ln(1+x)的导数：f^(n)(x) = (-1)^(n+1) × (n-1)! / (1+x)^n');
                    for (let n = 0; n <= degree; n++) {
                        let derivative;
                        if (n === 0) {
                            derivative = Math.log(1 + a);
                        } else {
                            const sign = Math.pow(-1, n + 1);
                            derivative = sign * factorial(n - 1) / Math.pow(1 + a, n);
                        }
                        
                        const fact = factorial(n);
                        const coeff = derivative / fact;
                        const xMinusA = x - a;
                        const term = coeff * Math.pow(xMinusA, n);
                        
                        terms.push({ n: n, derivative: derivative, coeff: coeff, term: term });
                        result += term;
                        
                        if (n <= 5) {
                            steps.push(`n = ${n}: f^(${n})(${a}) = ${derivative.toFixed(6)}, 项 = ${term.toFixed(10)}`);
                        }
                    }
                }
                
                steps.push('**步骤 4：汇总结果**');
                steps.push(`泰勒多项式在 x = ${x} 处的值 ≈ ${result.toFixed(10)}`);
                
                let exactValue;
                if (functionType === 'sin(x)') {
                    exactValue = Math.sin(x);
                } else if (functionType === 'cos(x)') {
                    exactValue = Math.cos(x);
                } else if (functionType === 'e^x') {
                    exactValue = Math.exp(x);
                } else {
                    exactValue = Math.log(1 + x);
                }
                
                steps.push(`精确值 = ${exactValue.toFixed(10)}`);
                steps.push(`误差 = ${Math.abs(result - exactValue).toExponential(4)}`);
                
                return {
                    result: result,
                    exactValue: exactValue,
                    steps: steps,
                    latex: `P_{${degree}}(${x}) \\approx ${result.toFixed(8)}`
                };
            },
            visualize: function(result, params) {
                const functionType = params.functionType;
                const a = parseFloat(params.center) || 0;
                const degree = parseInt(params.degree) || 5;
                const x = parseFloat(params.xValue) || 0;
                
                const factorial = (n) => {
                    let result = 1;
                    for (let i = 2; i <= n; i++) result *= i;
                    return result;
                };
                
                const evaluateFunction = (functionType, xVal) => {
                    if (functionType === 'sin(x)') return Math.sin(xVal);
                    if (functionType === 'cos(x)') return Math.cos(xVal);
                    if (functionType === 'e^x') return Math.exp(xVal);
                    if (functionType === 'ln(1+x)') return Math.log(1 + xVal);
                    return xVal;
                };
                
                const evaluateTaylor = (functionType, xVal, a, degree) => {
                    let sum = 0;
                    for (let n = 0; n <= degree; n++) {
                        let derivative;
                        if (functionType === 'sin(x)') {
                            const remainder = n % 4;
                            if (remainder === 0) derivative = Math.sin(a);
                            else if (remainder === 1) derivative = Math.cos(a);
                            else if (remainder === 2) derivative = -Math.sin(a);
                            else derivative = -Math.cos(a);
                        } else if (functionType === 'cos(x)') {
                            const remainder = n % 4;
                            if (remainder === 0) derivative = Math.cos(a);
                            else if (remainder === 1) derivative = -Math.sin(a);
                            else if (remainder === 2) derivative = -Math.cos(a);
                            else derivative = Math.sin(a);
                        } else if (functionType === 'e^x') {
                            derivative = Math.exp(a);
                        } else {
                            if (n === 0) derivative = Math.log(1 + a);
                            else derivative = Math.pow(-1, n + 1) * factorial(n - 1) / Math.pow(1 + a, n);
                        }
                        const coeff = derivative / factorial(n);
                        sum += coeff * Math.pow(xVal - a, n);
                    }
                    return sum;
                };
                
                const xValues = [];
                const exactValues = [];
                const taylorValues = [];
                const range = 3;
                
                for (let xv = a - range; xv <= a + range; xv += 0.1) {
                    xValues.push(xv);
                    exactValues.push(evaluateFunction(functionType, xv));
                    taylorValues.push(evaluateTaylor(functionType, xv, a, degree));
                }
                
                const trace1 = {
                    x: xValues,
                    y: exactValues,
                    type: 'scatter',
                    mode: 'lines',
                    name: `原函数 ${functionType}`,
                    line: { color: 'blue', width: 4 }
                };
                
                const trace2 = {
                    x: xValues,
                    y: taylorValues,
                    type: 'scatter',
                    mode: 'lines',
                    name: `${degree}阶泰勒多项式`,
                    line: { color: 'red', width: 2, dash: 'dash' }
                };
                
                const trace3 = {
                    x: [a],
                    y: [evaluateFunction(functionType, a)],
                    type: 'scatter',
                    mode: 'markers',
                    name: '展开中心',
                    marker: { color: 'green', size: 12 }
                };
                
                const layout = {
                    title: `泰勒展开可视化（${functionType} 在 x=${a} 处展开）`,
                    xaxis: { title: 'x' },
                    yaxis: { title: 'y' },
                    showlegend: true
                };
                
                return { data: [trace1, trace2, trace3], layout: layout };
            }
        },
        
        'function-plot': {
            title: '函数图像',
            category: 'calculus',
            description: '绘制一元函数的图像，可以直观展示函数的性质，如单调性、极值点、零点等。支持多种常用函数的图形绘制。',
            formula: '$$y = f(x)$$',
            parameters: [
                { name: 'functionType', type: 'select', options: ['多项式', '三角函数', '指数函数', '对数函数'], label: '函数类型', default: '多项式' },
                { name: 'functionExpr', type: 'text', label: '函数表达式 (如: x^3 - 3x)', default: 'x^3 - 3x' },
                { name: 'xMin', type: 'number', label: 'x 最小值', default: '-3' },
                { name: 'xMax', type: 'number', label: 'x 最大值', default: '3' },
                { name: 'showDerivative', type: 'checkbox', label: '显示导数', default: false }
            ],
            calculate: function(params) {
                const functionExpr = params.functionExpr;
                const xMin = parseFloat(params.xMin) || -3;
                const xMax = parseFloat(params.xMax) || 3;
                const steps = [];
                
                steps.push('**步骤 1：定义函数**');
                steps.push(`f(x) = ${functionExpr}`);
                steps.push(`定义域：[${xMin}, ${xMax}]`);
                
                const evaluate = (expr, xVal) => {
                    try {
                        let safeExpr = expr;
                        
                        safeExpr = safeExpr
                            .replace(/sin/g, 'Math.sin')
                            .replace(/cos/g, 'Math.cos')
                            .replace(/tan/g, 'Math.tan')
                            .replace(/log/g, 'Math.log')
                            .replace(/ln/g, 'Math.log')
                            .replace(/exp/g, 'Math.exp')
                            .replace(/sqrt/g, 'Math.sqrt');
                        
                        safeExpr = safeExpr.replace(/(\d+)([x\(])/g, '$1*$2');
                        safeExpr = safeExpr.replace(/([\)])([x\(])/g, '$1*$2');
                        safeExpr = safeExpr.replace(/x\(/g, 'x*(');
                        
                        safeExpr = safeExpr.replace(/\^/g, '**');
                        
                        safeExpr = safeExpr.replace(/x/g, `(${xVal})`);
                        
                        return eval(safeExpr);
                    } catch (e) {
                        console.error('表达式计算错误:', expr, 'xVal=', xVal, 'error:', e);
                        return NaN;
                    }
                };
                
                steps.push('**步骤 2：计算关键点**');
                
                const points = [];
                for (let x = xMin; x <= xMax; x += (xMax - xMin) / 10) {
                    const y = evaluate(functionExpr, x);
                    points.push({ x: x.toFixed(2), y: y.toFixed(4) });
                }
                
                steps.push('部分函数值：');
                points.slice(0, 5).forEach(p => {
                    steps.push(`f(${p.x}) = ${p.y}`);
                });
                
                steps.push('**步骤 3：函数性质分析**');
                steps.push('观察图像可以了解函数的：');
                steps.push('- 单调性（递增/递减区间）');
                steps.push('- 极值点（局部最大值/最小值）');
                steps.push('- 零点（与x轴交点）');
                steps.push('- 渐近线');
                
                return {
                    result: '图像已生成',
                    steps: steps,
                    latex: `y = f(x)`
                };
            },
            visualize: function(result, params) {
                const functionExpr = params.functionExpr;
                const xMin = parseFloat(params.xMin) || -3;
                const xMax = parseFloat(params.xMax) || 3;
                
                const evaluate = (expr, xVal) => {
                    try {
                        let safeExpr = expr;
                        
                        safeExpr = safeExpr
                            .replace(/sin/g, 'Math.sin')
                            .replace(/cos/g, 'Math.cos')
                            .replace(/tan/g, 'Math.tan')
                            .replace(/log/g, 'Math.log')
                            .replace(/ln/g, 'Math.log')
                            .replace(/exp/g, 'Math.exp')
                            .replace(/sqrt/g, 'Math.sqrt');
                        
                        safeExpr = safeExpr.replace(/(\d+)([x\(])/g, '$1*$2');
                        safeExpr = safeExpr.replace(/([\)])([x\(])/g, '$1*$2');
                        safeExpr = safeExpr.replace(/x\(/g, 'x*(');
                        
                        safeExpr = safeExpr.replace(/\^/g, '**');
                        
                        safeExpr = safeExpr.replace(/x/g, `(${xVal})`);
                        
                        return eval(safeExpr);
                    } catch (e) {
                        console.error('表达式计算错误:', expr, 'xVal=', xVal, 'error:', e);
                        return NaN;
                    }
                };
                
                const xValues = [];
                const yValues = [];
                const step = (xMax - xMin) / 200;
                
                for (let xv = xMin; xv <= xMax; xv += step) {
                    xValues.push(xv);
                    yValues.push(evaluate(functionExpr, xv));
                }
                
                const trace1 = {
                    x: xValues,
                    y: yValues,
                    type: 'scatter',
                    mode: 'lines',
                    name: `f(x) = ${functionExpr}`,
                    line: { color: 'blue', width: 3 }
                };
                
                const layout = {
                    title: `函数图像：y = ${functionExpr}`,
                    xaxis: { title: 'x' },
                    yaxis: { title: 'y' },
                    showlegend: true
                };
                
                return { data: [trace1], layout: layout };
            }
        },
        
        '3d-plot': {
            title: '3D曲面',
            category: 'calculus',
            description: '绘制二元函数的三维曲面图像，可以直观展示二元函数的性质，如极值点、鞍点、等高线等。支持多种二元函数的3D可视化。',
            formula: '$$z = f(x, y)$$',
            parameters: [
                { name: 'functionType', type: 'select', options: ['马鞍面', '抛物面', '正弦曲面', '球面'], label: '曲面类型', default: '马鞍面' },
                { name: 'xMin', type: 'number', label: 'x 最小值', default: '-2' },
                { name: 'xMax', type: 'number', label: 'x 最大值', default: '2' },
                { name: 'yMin', type: 'number', label: 'y 最小值', default: '-2' },
                { name: 'yMax', type: 'number', label: 'y 最大值', default: '2' }
            ],
            calculate: function(params) {
                const functionType = params.functionType;
                const steps = [];
                
                steps.push('**步骤 1：定义二元函数**');
                
                let functionName = '';
                let functionFormula = '';
                
                if (functionType === '马鞍面') {
                    functionName = '马鞍面（双曲抛物面）';
                    functionFormula = 'z = x² - y²';
                } else if (functionType === '抛物面') {
                    functionName = '椭圆抛物面';
                    functionFormula = 'z = x² + y²';
                } else if (functionType === '正弦曲面') {
                    functionName = '正弦曲面';
                    functionFormula = 'z = sin(x) + cos(y)';
                } else if (functionType === '球面') {
                    functionName = '球面';
                    functionFormula = 'x² + y² + z² = r²';
                }
                
                steps.push(`曲面类型：${functionName}`);
                steps.push(`函数表达式：${functionFormula}`);
                
                steps.push('**步骤 2：曲面性质分析**');
                
                if (functionType === '马鞍面') {
                    steps.push('马鞍面在原点(0,0,0)处有一个鞍点：');
                    steps.push('- 沿x轴方向：z = x²，是一个抛物线，开口向上');
                    steps.push('- 沿y轴方向：z = -y²，是一个抛物线，开口向下');
                    steps.push('原点是一个临界点，但既不是极大值也不是极小值');
                } else if (functionType === '抛物面') {
                    steps.push('椭圆抛物面在原点(0,0,0)处有一个全局最小值：');
                    steps.push('z = x² + y² ≥ 0，当且仅当 x=0 且 y=0 时 z=0');
                    steps.push('所有等高线都是圆形');
                } else if (functionType === '正弦曲面') {
                    steps.push('正弦曲面是一个周期性的波浪曲面：');
                    steps.push('函数值在 [-2, 2] 之间周期性变化');
                    steps.push('存在多个极大值点和极小值点');
                } else if (functionType === '球面') {
                    steps.push('球面的标准方程：x² + y² + z² = r²');
                    steps.push('这里绘制上半球面：z = √(r² - x² - y²)');
                    steps.push('球面上任意一点到球心的距离相等');
                }
                
                steps.push('**步骤 3：可视化效果**');
                steps.push('3D图像将展示曲面的整体形状，可以通过鼠标拖动旋转视角');
                
                return {
                    result: '3D曲面已生成',
                    steps: steps,
                    latex: `z = f(x, y)`
                };
            },
            visualize: function(result, params) {
                const functionType = params.functionType;
                const xMin = parseFloat(params.xMin) || -2;
                const xMax = parseFloat(params.xMax) || 2;
                const yMin = parseFloat(params.yMin) || -2;
                const yMax = parseFloat(params.yMax) || 2;
                
                const xValues = [];
                const yValues = [];
                const zValues = [];
                const step = (xMax - xMin) / 50;
                
                for (let xv = xMin; xv <= xMax; xv += step) {
                    xValues.push(xv);
                }
                
                for (let yv = yMin; yv <= yMax; yv += step) {
                    yValues.push(yv);
                }
                
                for (let i = 0; i < xValues.length; i++) {
                    const row = [];
                    for (let j = 0; j < yValues.length; j++) {
                        const x = xValues[i];
                        const y = yValues[j];
                        let z;
                        
                        if (functionType === '马鞍面') {
                            z = x * x - y * y;
                        } else if (functionType === '抛物面') {
                            z = x * x + y * y;
                        } else if (functionType === '正弦曲面') {
                            z = Math.sin(x) + Math.cos(y);
                        } else if (functionType === '球面') {
                            const r2 = 4;
                            const val = r2 - x * x - y * y;
                            z = val >= 0 ? Math.sqrt(val) : null;
                        }
                        
                        row.push(z);
                    }
                    zValues.push(row);
                }
                
                const trace = {
                    x: xValues,
                    y: yValues,
                    z: zValues,
                    type: 'surface',
                    colorscale: 'Viridis'
                };
                
                const layout = {
                    title: `3D曲面：${functionType}`,
                    scene: {
                        xaxis: { title: 'x' },
                        yaxis: { title: 'y' },
                        zaxis: { title: 'z' }
                    }
                };
                
                return { data: [trace], layout: layout };
            }
        }
    },
    
    matrixToLatex: function(matrix) {
        if (!matrix || matrix.length === 0) return '';
        let latex = '\\begin{pmatrix}';
        for (let i = 0; i < matrix.length; i++) {
            const row = matrix[i].map(v => typeof v === 'number' ? v.toFixed(4) : v);
            latex += row.join(' & ');
            if (i < matrix.length - 1) latex += ' \\\\ ';
        }
        latex += '\\end{pmatrix}';
        return latex;
    }
};

const App = {
    currentFormula: null,
    currentParams: {},
    
    init: function() {
        this.bindEvents();
        this.initSidebar();
    },
    
    bindEvents: function() {
        const self = this;
        
        document.querySelectorAll('.category-title').forEach(title => {
            title.addEventListener('click', function() {
                const category = this.dataset.category;
                const list = document.getElementById(category + '-list');
                const icon = this.querySelector('.toggle-icon');
                
                if (list.classList.contains('expanded')) {
                    list.classList.remove('expanded');
                    icon.textContent = '▼';
                } else {
                    list.classList.add('expanded');
                    icon.textContent = '▲';
                }
            });
        });
        
        document.querySelectorAll('.formula-item').forEach(item => {
            item.addEventListener('click', function() {
                document.querySelectorAll('.formula-item').forEach(i => i.classList.remove('active'));
                this.classList.add('active');
                const formulaId = this.dataset.formula;
                self.selectFormula(formulaId);
            });
        });
        
        document.getElementById('calculate-btn').addEventListener('click', function() {
            self.calculate();
        });
        
        document.getElementById('linear-algebra-list').classList.add('expanded');
    },
    
    initSidebar: function() {
    },
    
    selectFormula: function(formulaId) {
        const formula = MathCalculus.formulas[formulaId];
        if (!formula) return;
        
        this.currentFormula = formula;
        
        const titleElement = document.getElementById('formula-title');
        const descriptionElement = document.getElementById('formula-description');
        
        titleElement.textContent = formula.title;
        
        let descriptionHTML = '<p>' + formula.description + '</p>';
        descriptionHTML += '<div class="formula-display">';
        descriptionHTML += '<p><strong>公式：</strong></p>';
        descriptionHTML += '<p>' + formula.formula + '</p>';
        if (formula.formula2) {
            descriptionHTML += '<p>' + formula.formula2 + '</p>';
        }
        descriptionHTML += '</div>';
        
        descriptionElement.innerHTML = descriptionHTML;
        
        this.generateInputForm(formula);
        
        this.syncMatrixSize(formula);
        
        if (window.MathJax && window.MathJax.typeset) {
            window.MathJax.typeset([descriptionElement]);
        }
        
        document.getElementById('result-section').style.display = 'none';
        document.getElementById('visualization-placeholder').style.display = 'flex';
        document.getElementById('plotly-chart').style.display = 'none';
    },
    
    generateInputForm: function(formula) {
        const inputArea = document.getElementById('input-area');
        let html = '';
        
        formula.parameters.forEach((param, index) => {
            html += '<div class="input-group">';
            html += '<label for="param-' + index + '">' + param.label + '</label>';
            
            if (param.type === 'select') {
                html += '<select id="param-' + index + '" data-param-name="' + param.name + '">';
                param.options.forEach(option => {
                    const selected = option === param.default ? 'selected' : '';
                    html += '<option value="' + option + '" ' + selected + '>' + option + '</option>';
                });
                html += '</select>';
            } else if (param.type === 'matrix-simple') {
                html += '<div class="matrix-input-wrapper matrix-simple-wrapper" data-matrix-name="' + param.name + '">';
                html += '<div class="matrix-input" id="matrix-' + param.name + '">';
                html += this.generateMatrixInputs(2, param.name);
                html += '</div>';
                html += '</div>';
            } else if (param.type === 'matrix') {
                html += '<div class="matrix-input-wrapper" data-matrix-name="' + param.name + '">';
                html += '<div class="matrix-size">';
                html += '<label>矩阵大小：</label>';
                html += '<select class="matrix-size-select">';
                html += '<option value="2">2×2</option>';
                html += '<option value="3">3×3</option>';
                html += '<option value="4">4×4</option>';
                html += '</select>';
                html += '</div>';
                html += '<div class="matrix-input" id="matrix-' + param.name + '">';
                html += this.generateMatrixInputs(2, param.name);
                html += '</div>';
                html += '</div>';
            } else if (param.type === 'vector' || param.type === 'vector3d') {
                const size = param.type === 'vector3d' ? 3 : 3;
                html += '<div class="vector-input" data-vector-name="' + param.name + '">';
                html += '( ';
                for (let i = 0; i < size; i++) {
                    const defaultValue = i === 0 ? '1' : (i === 1 ? '2' : '3');
                    html += '<input type="number" step="any" value="' + defaultValue + '" data-index="' + i + '" style="width: 60px; text-align: center; margin: 0 5px;">';
                    if (i < size - 1) html += ', ';
                }
                html += ' )';
                html += '</div>';
            } else if (param.type === 'checkbox') {
                const checked = param.default ? 'checked' : '';
                html += '<input type="checkbox" id="param-' + index + '" data-param-name="' + param.name + '" ' + checked + '>';
            } else {
                const defaultVal = param.default || '';
                html += '<input type="' + param.type + '" id="param-' + index + '" data-param-name="' + param.name + '" value="' + defaultVal + '" step="any">';
            }
            
            html += '</div>';
        });
        
        inputArea.innerHTML = html;
        
        this.bindMatrixEvents();
    },
    
    generateMatrixInputs: function(size, matrixName) {
        let html = '';
        for (let i = 0; i < size; i++) {
            html += '<div class="matrix-row">';
            for (let j = 0; j < size; j++) {
                const value = (i === j) ? '1' : '0';
                html += '<input type="number" step="any" value="' + value + '" data-row="' + i + '" data-col="' + j + '">';
            }
            html += '</div>';
        }
        return html;
    },
    
    bindMatrixEvents: function() {
        const self = this;
        
        document.querySelectorAll('.matrix-size-select').forEach(select => {
            select.addEventListener('change', function() {
                const size = parseInt(this.value);
                const wrapper = this.closest('.matrix-input-wrapper');
                const matrixName = wrapper.dataset.matrixName;
                const matrixDiv = wrapper.querySelector('.matrix-input');
                matrixDiv.innerHTML = self.generateMatrixInputs(size, matrixName);
            });
        });
    },
    
    syncMatrixSize: function(formula) {
        const self = this;
        
        let matrixSizeSelect = null;
        let matrixSizeIndex = -1;
        
        formula.parameters.forEach((param, index) => {
            if (param.name === 'matrixSize' && param.type === 'select') {
                matrixSizeSelect = document.getElementById('param-' + index);
                matrixSizeIndex = index;
            }
        });
        
        if (matrixSizeSelect) {
            const updateMatrixSize = function() {
                const sizeStr = matrixSizeSelect.value;
                const size = parseInt(sizeStr.split('x')[0]);
                
                document.querySelectorAll('.matrix-simple-wrapper').forEach(wrapper => {
                    const matrixDiv = wrapper.querySelector('.matrix-input');
                    const matrixName = wrapper.dataset.matrixName;
                    matrixDiv.innerHTML = self.generateMatrixInputs(size, matrixName);
                });
            };
            
            updateMatrixSize();
            
            matrixSizeSelect.addEventListener('change', updateMatrixSize);
        }
    },
    
    collectParameters: function() {
        const params = {};
        const formula = this.currentFormula;
        
        if (!formula) return params;
        
        formula.parameters.forEach((param, index) => {
            if (param.type === 'matrix-simple') {
                const wrapper = document.querySelector('.matrix-input-wrapper[data-matrix-name="' + param.name + '"]');
                if (wrapper) {
                    let size = 2;
                    
                    formula.parameters.forEach((p, i) => {
                        if (p.name === 'matrixSize' && p.type === 'select') {
                            const select = document.getElementById('param-' + i);
                            if (select) {
                                size = parseInt(select.value.split('x')[0]);
                            }
                        }
                    });
                    
                    const matrix = [];
                    
                    for (let i = 0; i < size; i++) {
                        const row = [];
                        for (let j = 0; j < size; j++) {
                            const input = wrapper.querySelector('input[data-row="' + i + '"][data-col="' + j + '"]');
                            row.push(input ? input.value : '0');
                        }
                        matrix.push(row);
                    }
                    
                    params[param.name] = matrix;
                }
            } else if (param.type === 'matrix') {
                const wrapper = document.querySelector('.matrix-input-wrapper[data-matrix-name="' + param.name + '"]');
                if (wrapper) {
                    const sizeSelect = wrapper.querySelector('.matrix-size-select');
                    const size = sizeSelect ? parseInt(sizeSelect.value) : 2;
                    const matrix = [];
                    
                    for (let i = 0; i < size; i++) {
                        const row = [];
                        for (let j = 0; j < size; j++) {
                            const input = wrapper.querySelector('input[data-row="' + i + '"][data-col="' + j + '"]');
                            row.push(input ? input.value : '0');
                        }
                        matrix.push(row);
                    }
                    
                    params[param.name] = matrix;
                    
                    if (param.name === 'matrixA') {
                        params.matrixSize = size + 'x' + size;
                    }
                }
            } else if (param.type === 'vector' || param.type === 'vector3d') {
                const wrapper = document.querySelector('.vector-input[data-vector-name="' + param.name + '"]');
                if (wrapper) {
                    const inputs = wrapper.querySelectorAll('input');
                    const vector = [];
                    inputs.forEach(input => {
                        vector.push(input.value);
                    });
                    params[param.name] = vector;
                }
            } else if (param.type === 'select') {
                const select = document.getElementById('param-' + index);
                if (select) {
                    params[param.name] = select.value;
                }
            } else if (param.type === 'checkbox') {
                const checkbox = document.getElementById('param-' + index);
                if (checkbox) {
                    params[param.name] = checkbox.checked;
                }
            } else {
                const input = document.getElementById('param-' + index);
                if (input) {
                    params[param.name] = input.value;
                }
            }
        });
        
        return params;
    },
    
    calculate: function() {
        if (!this.currentFormula) {
            alert('请先选择一个公式！');
            return;
        }
        
        const params = this.collectParameters();
        console.log('收集到的参数:', params);
        this.currentParams = params;
        
        try {
            const result = this.currentFormula.calculate(params);
            console.log('计算结果:', result);
            
            this.displayResult(result);
            
            if (!result.error) {
                this.visualize(result, params);
            }
        } catch (error) {
            console.error('计算错误:', error);
            this.displayError('计算过程中发生错误：' + error.message);
            alert('计算错误：' + error.message);
        }
    },
    
    displayResult: function(result) {
        const resultSection = document.getElementById('result-section');
        const resultDisplay = document.getElementById('result-display');
        const stepsContent = document.getElementById('steps-content');
        
        resultSection.style.display = 'block';
        resultSection.classList.add('animate-fade-in');
        
        if (result.error) {
            resultDisplay.innerHTML = '<div class="error-message">' + result.error + '</div>';
        } else {
            let resultHTML = '<div class="math-result">';
            if (typeof result.result === 'number') {
                resultHTML += '$$' + result.latex + '$$';
            } else if (Array.isArray(result.result)) {
                resultHTML += '$$' + result.latex + '$$';
            } else {
                resultHTML += result.latex;
            }
            resultHTML += '</div>';
            
            if (result.exactValue !== undefined) {
                resultHTML += '<p>精确值：' + result.exactValue.toFixed(10) + '</p>';
                resultHTML += '<p>误差：' + Math.abs(result.result - result.exactValue).toExponential(4) + '</p>';
            }
            
            resultDisplay.innerHTML = resultHTML;
        }
        
        let stepsHTML = '';
        result.steps.forEach((step, index) => {
            stepsHTML += '<div class="step-item">';
            stepsHTML += step;
            stepsHTML += '</div>';
        });
        
        stepsContent.innerHTML = stepsHTML;
        
        if (window.MathJax && window.MathJax.typeset) {
            window.MathJax.typeset([resultDisplay, stepsContent]);
        }
    },
    
    displayError: function(message) {
        const resultSection = document.getElementById('result-section');
        const resultDisplay = document.getElementById('result-display');
        resultSection.style.display = 'block';
        resultDisplay.innerHTML = '<div class="error-message">' + message + '</div>';
    },
    
    visualize: function(result, params) {
        if (!this.currentFormula.visualize) {
            console.log('当前公式没有可视化函数');
            return;
        }
        
        try {
            console.log('开始可视化，result:', result, 'params:', params);
            const plotData = this.currentFormula.visualize(result.result, params);
            console.log('生成的图表数据:', plotData);
            
            const placeholder = document.getElementById('visualization-placeholder');
            const chartDiv = document.getElementById('plotly-chart');
            
            placeholder.style.display = 'none';
            chartDiv.style.display = 'block';
            
            Plotly.newPlot('plotly-chart', plotData.data, plotData.layout, {responsive: true});
            console.log('Plotly图表渲染完成');
        } catch (error) {
            console.error('可视化错误:', error);
            alert('可视化错误：' + error.message);
        }
    }
};

document.addEventListener('DOMContentLoaded', function() {
    App.init();
});
