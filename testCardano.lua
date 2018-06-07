local tau = math.pi *2

local function crt (v)
    if v < 0 then
        return - math.pow(-v, 1/3)
    else
        return math.pow(v, 1/3)
    end
end

local function cardano(curve,x)
    local pa = x - 0;
    local pb = x - curve[1];
    local pc = x - curve[3];
    local pd = x - 1;
        
    -- to [t^3 + at^2 + bt + c] form:
    local pa3 = pa * 3;
    local pb3 = pb * 3;
    local pc3 = pc * 3;
    local d = (-pa + pb3 - pc3 + pd)
    local rd = 1 / d
    local r3 = 1 / 3
    local a = (pa3 - 6 * pb + pc3) * rd
    local a3 = a * r3
    local b = (-pa3 + pb3) * rd
    local c = pa * rd
    -- then, determine p and q:
    local p = (3 * b - a * a) * r3
    local p3 = p * r3
    local q = (2 * a * a * a - 9 * a * b + 27 * c) / 27
    local q2 = q / 2
    -- and determine the discriminant:
    local discriminant = q2 * q2 + p3 * p3 * p3;
    -- and some reserved variables
    local u1 = 0;
    local v1 = 0;
    local x1 = 0;
    local x2 = 0;
    local x3 = 0;
        
    -- If the discriminant is negative, use polar coordinates
    -- to get around square roots of negative numbers
    if (discriminant < 0) then
        local mp3 = -p * r3;
        local mp33 = mp3 * mp3 * mp3;
        local r = math.sqrt(mp33);
        -- compute cosphi corrected for IEEE float rounding:
        local t = -q / (2 * r);
        local cosphi = t
        if t<-1 then
            cosphi=-1
        elseif t>1 then
            cosphi=1
        end
        local phi = math.acos(cosphi);
        local crtr = crt(r);
        local t1 = 2 * crtr;
        x1 = t1 * math.cos(phi * r3) - a3;
        x2 = t1 * math.cos((phi + tau) * r3) - a3;
        x3 = t1 * math.cos((phi + 2 * tau) * r3) - a3;
            
        -- choose best percentage
        if (0 <= x1 and x1 <= 1) then
            if (0 <= x2 and x2 <= 1) then
                if (0 <= x3 and x3 <= 1) then
                    return math.max(x1, x2, x3);
                else
                    return math.max(x1, x2);
                end
            elseif (0 <= x3 and x3 <= 1) then
                return math.max(x1, x3);
            else
                return x1;
            end
        else
            if (0 <= x2 and x2 <= 1) then
                if (0 <= x3 and x3 <= 1) then
                    return math.max(x2, x3);
                else
                    return x2;
                end
            else
                return x3;
            end
        end
    elseif (discriminant == 0) then
        u1 = -crt(q2);
        if q2 < 0 then
            u1=crt(-q2)
        end 
        x1 = 2 * u1 - a3;
        x2 = -u1 - a3;
            
        -- choose best percentage
        if (0 <= x1 and x1 <= 1) then
            if (0 <= x2 and x2 <= 1) then
                return math.max(x1, x2);
            else
                return x1;
            end
        else
            return x2;
        end
    -- one real root, and two imaginary roots
    else
        local sd = math.sqrt(discriminant);
        u1 = crt(-q2 + sd);
        v1 = crt(q2 + sd);
        x1 = u1 - v1 - a3;
        return x1;
    end
end

return cardano
