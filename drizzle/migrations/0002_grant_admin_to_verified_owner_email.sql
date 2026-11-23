CREATE OR REPLACE FUNCTION public.grant_designated_admin_on_email_confirmation()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.email_confirmed_at IS NOT NULL
     AND lower(COALESCE(NEW.email, '')) = lower('raghavendra921006l@gmail.com') THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin'::public.app_role)
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;
REVOKE ALL ON FUNCTION public.grant_designated_admin_on_email_confirmation() FROM PUBLIC, anon, authenticated;
CREATE TRIGGER grant_designated_admin_on_user_insert
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.grant_designated_admin_on_email_confirmation();
CREATE TRIGGER grant_designated_admin_on_email_confirmation
AFTER UPDATE OF email, email_confirmed_at ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.grant_designated_admin_on_email_confirmation();